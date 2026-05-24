export interface FathomReport {
  id: string;
  name: string;
  modifiedAt: string;
  url: string;
  rows: Array<Record<string, string | number>>;
}

const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
const driveApiKey = process.env.GOOGLE_DRIVE_API_KEY;
const accessToken = process.env.GOOGLE_DRIVE_ACCESS_TOKEN ?? process.env.GOOGLE_OAUTH_ACCESS_TOKEN;

function buildRowObject(headers: string[], row: Array<string | number>): Record<string, string | number> {
  const record: Record<string, string | number> = {};
  for (let index = 0; index < headers.length; index += 1) {
    const key = String(headers[index] ?? `column_${index}`).trim() || `column_${index}`;
    record[key] = row[index] ?? "";
  }
  return record;
}

async function fetchDriveFiles(): Promise<any> {
  if (!folderId) {
    throw new Error("Missing GOOGLE_DRIVE_FOLDER_ID environment variable.");
  }

  const url = new URL("https://www.googleapis.com/drive/v3/files");
  const query = `'${folderId}' in parents and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`;
  url.searchParams.set("q", query);
  url.searchParams.set("fields", "files(id,name,modifiedTime,webViewLink)");
  url.searchParams.set("pageSize", "10");
  if (driveApiKey) {
    url.searchParams.set("key", driveApiKey);
  }

  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(url.toString(), { method: "GET", headers });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Google Drive files list failed: ${response.status} ${response.statusText} ${JSON.stringify(json)}`);
  }

  return json.files ?? [];
}

async function readSheetRows(spreadsheetId: string): Promise<Array<Record<string, string | number>>> {
  if (!driveApiKey && !accessToken) {
    return [
      {
        warning:
          "Missing GOOGLE_DRIVE_API_KEY or GOOGLE_DRIVE_ACCESS_TOKEN. Add credentials to read Fathom sheets from Google Drive.",
      },
    ];
  }

  const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z1000`);
  url.searchParams.set("majorDimension", "ROWS");
  if (driveApiKey) {
    url.searchParams.set("key", driveApiKey);
  }

  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(url.toString(), { method: "GET", headers });
  const json = await response.json();

  if (!response.ok) {
    return [
      {
        warning: `Unable to load sheet data for ${spreadsheetId}: ${response.status} ${response.statusText}`,
      },
    ];
  }

  const values = Array.isArray(json.values) ? json.values : [];
  const headersRow = values[0]?.map((cell: any) => String(cell ?? "").trim()) ?? [];

  return values.slice(1).map((row: Array<string | number>) => buildRowObject(headersRow, row));
}

export async function getFathomReports(): Promise<FathomReport[]> {
  const files = await fetchDriveFiles();
  const latestSheets = Array.isArray(files)
    ? files.sort((a, b) => new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime()).slice(0, 3)
    : [];

  if (!latestSheets.length) {
    return [
      {
        id: "no-fathom-reports",
        name: "No Fathom Monthly reports found",
        modifiedAt: new Date().toISOString(),
        url: "",
        rows: [
          {
            warning:
              "No spreadsheets found in the configured Fathom Monthly folder. Verify GOOGLE_DRIVE_FOLDER_ID and folder contents.",
          },
        ],
      },
    ];
  }

  return Promise.all(
    latestSheets.map(async (file: any) => ({
      id: file.id,
      name: file.name,
      modifiedAt: file.modifiedTime,
      url: file.webViewLink,
      rows: await readSheetRows(file.id),
    }))
  );
}

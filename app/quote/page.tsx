import PricingCalculator from '../../components/shared/PricingCalculator';

export const metadata = {
  title: "Free Pest Control Quote | EnviroCare Alabama",
  description: "Get an instant pest control price range for your Alabama home. Pest, termite, mosquito and bundle plans. Free inspection — no obligation.",
};

export default function QuotePage() {
  return (
    <>
      <PricingCalculator />
      <p style={{
        textAlign: 'center',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: '14px',
        color: '#5A6660',
        padding: '0 16px 40px',
        margin: 0,
      }}>
        Need help choosing?{' '}
        <a
          href="/request-quote"
          style={{ color: '#0E8E40', textDecoration: 'underline', fontWeight: 600 }}
        >
          Request a personal quote →
        </a>
      </p>
    </>
  );
}

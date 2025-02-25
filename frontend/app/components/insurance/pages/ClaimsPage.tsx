import { useState } from 'react';
import { FileClaimForm } from '../claims/FileClaimForm';
import { MOCK_ACTIVE_POLICIES } from '../../../constants/insurance';

export function ClaimsPage() {
  const [isFilingClaim, setIsFilingClaim] = useState(false);

  return (
    <div>
      {isFilingClaim && (
        <FileClaimForm
          activePolicies={MOCK_ACTIVE_POLICIES}
          onSubmit={(data) => {
            console.log('Claim submitted:', data);
            setIsFilingClaim(false);
          }}
          onClose={() => setIsFilingClaim(false)}
        />
      )}
    </div>
  );
} 
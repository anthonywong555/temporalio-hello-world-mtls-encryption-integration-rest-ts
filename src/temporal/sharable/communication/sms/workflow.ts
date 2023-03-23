import { proxyActivities } from '@temporalio/workflow';
import { createTwilioActivites, TWILIO_PROVIDER } from './twilio/activites';
import { SMSRequest, SMSResponse } from './types';
import { createVonageActivites, VONAGE_PROVIDER } from './vonage/activites';

const { twilioMessageCreate } = proxyActivities<ReturnType<typeof createTwilioActivites>>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3
  }
});

const { vonageMessageCreate } = proxyActivities<ReturnType<typeof createVonageActivites>>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3
  }
});

export async function sendSMS(request: SMSRequest): Promise<SMSResponse> {
  const { toPhoneNumber, fromPhoneNumber, body } = request;
  const { providers } = request;
  const errors = [];

  for(const aProvider of providers) {
    try {
      if(aProvider === TWILIO_PROVIDER) {
        return await twilioMessageCreate({
          body,
          from: fromPhoneNumber,
          to: toPhoneNumber
        });
      } else if(aProvider ===  VONAGE_PROVIDER) {
        return await vonageMessageCreate({
          from: fromPhoneNumber,
          to: toPhoneNumber,
          text: body
        });
      } else {
        throw new Error(`${aProvider} is not configure.`);
      }
    } catch (e) {
      errors.push(e);
    }
  }

  throw new Error('All SMS Provider Failed. See error messages: ' + errors.join('\n'));
}
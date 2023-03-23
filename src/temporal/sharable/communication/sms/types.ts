/**
 * @provider: Which SMS Provider do you want to use.
 * @toPhoneNumber: Phone Number you want to send a SMS to.
 * @fromPhoneNumber: Phone Number you waant to use to send a SMS.
 * @body: Body of the SMS.
 * @mediaURLs: Array of URLs to send as MMS.
 */
export interface SMSRequest {
  providers: string[];
  toPhoneNumber: string;
  fromPhoneNumber?: string;
  body: string;
  mediaURLs?: string[];
}

/**
 * @id: Unqiue Id of SMS.
 * @additionalInfo: This can be additional payload of the provider.
 * @errorMessage: Any error message that can be the issue.
 */
export interface SMSResponse {
  id?: string;
  additionalInfo?: any;
  errorMessage?: string;
}
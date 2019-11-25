export class Alert {
    type: AlertType;
    message: string;
  }
  
  export enum AlertType {
    Success,
    Error,
    Info,
    Warning
  }
  
  export class TermsCondition {
    termsAndConditionId: number;
    termsAndConditionVal: string;
  }
  
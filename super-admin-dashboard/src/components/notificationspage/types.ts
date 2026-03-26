export type Notification = {
  id: number;
  title: string;
  message: string;
  target: string;
  recipients: number;
  date: string;
  time: string;
  status: "Sent" | "Pending";
  type: "all" | "system" | "admin" | "promo";
};
import { APPLICATION_ID } from "@/lib/constants";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: APPLICATION_ID });

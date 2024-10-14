import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import * as dotenv from "dotenv";
dotenv.config();

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sqsQueueUrl = process.env.SQS_QUEUE_URL;

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error(
    "AWS credentials are not properly set in environment variables.",
  );
}

const client = new SQSClient({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

export async function POST(req: Request) {
  // Parse the JSON payload from the request body
  let payload;
  try {
    payload = await req.json();
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON payload" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validate the payload
  if (!payload.streamer1 || !payload.streamer2 || !payload.topic) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Missing required fields in payload",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const command = new SendMessageCommand({
    QueueUrl: sqsQueueUrl,
    MessageBody: JSON.stringify(payload),
  });

  try {
    const response = await client.send(command);
    console.log("Message sent successfully:", response);
    return new Response(
      JSON.stringify({ success: true, messageId: response.MessageId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

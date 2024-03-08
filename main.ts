// For task sheduling
import { cron } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";

// For ntfyer
import { NtfyClient } from "./src/client.ts";

// Create ntfy.sh client
const client = new NtfyClient("infernaglobal-probando");

// Setup ntfyer modules
async function socket(client: NtfyClient) {
	const conn = await Deno.connect({ hostname: "23.137.104.4", port: 7171 });
	client.send(conn as string, { Title: "Estado del servidor" });
}

cron("* * * * *", () => {
	socket(client).then((conn) => {
		console.log(conn);
	});
});

// For task sheduling
import { cron } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";

// For ntfyer
import { NtfyClient } from "./src/client.ts";

// Create ntfy.sh client
const client = new NtfyClient("infernaglobal-probando");

// Setup ntfyer modules
async function socket(client: NtfyClient) {
	const conn = await Deno.connect({ hostname: "23.137.104.4", port: 7171 });

	conn.write(new TextEncoder().encode("06\x00\x00\xff\xffinfo"));
	const buffer = new Uint8Array(1024);
	const n = await conn.read(buffer);
	conn.close();

	if (n === null) {
		client.send("Server is offline", { Title: "Estado del servidor" });
		return;
	}

	console.log(n);
	console.log(buffer);

	client.send(n as string, { Title: "Estado del servidor" });
	// $socket = @fsockopen($this->server, $this->port, $error, $message, config('status_timeout'));

	//       // if connected then checking statistics
	//       if ($socket) {
	//           // sets 5 second timeout for reading and writing
	//           stream_set_timeout($socket, 5);

	//           // creates real packet
	//           $packet = $packet->getBuffer();
	//           $packet = pack('v', strlen($packet)) . $packet;

	//           // sends packet with request
	//           // 06 - length of packet, 255, 255 is the comamnd identifier, 'info' is a request
	//           fwrite($socket, $packet);

	//           // reads respond
	//           //$data = stream_get_contents($socket);
	//           $data = '';
	//           while (!feof($socket))
	//               $data .= fgets($socket, 1024);

	//           // closing connection to current server
	//           fclose($socket);

	//           // sometimes server returns empty info
	//           if (empty($data)) {
	//               // returns offline state
	//               return false;
	//           }

	//           return new OTS_Buffer($data);
	//       }

	//       return false;
}

cron("* * * * *", () => {
	socket(client);
});

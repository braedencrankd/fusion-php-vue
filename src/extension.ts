import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
  // Configure the language client options
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "vuephp" }],
    synchronize: {
      configurationSection: "vuephp",
    },
  };

  // Configure the language client options
  const serverOptions: ServerOptions = {
    run: {
      module: context.asAbsolutePath("out/server.js"),
      transport: TransportKind.ipc,
    },
    debug: {
      module: context.asAbsolutePath("out/server.js"),
      transport: TransportKind.ipc,
    },
  };

  // Register the client
  client = new LanguageClient(
    "vuephp",
    "VuePHP Language Server",
    serverOptions,
    clientOptions
  );

  // Start the client
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}

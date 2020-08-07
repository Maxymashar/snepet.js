import { platform, homedir } from "os";
import { join } from "path";

export function getPath() {
    switch (platform()) {
        case 'win32':
            return join(homedir(), 'APPDATA','roaming', 'Code', 'User', 'snippets');
        case 'darwin':
            return join(homedir(), 'Library', 'Application Support', 'Code', 'User', 'snippets');
        case 'linux':
            return join(homedir(), 'config', 'Code', 'User', 'snippets');
        default:
            return "";
    }
}


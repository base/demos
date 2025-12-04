import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'agent-db.json');

export interface AgentSettings {
    userAddress: string;
    enabled: boolean;
    strategy: 'conservative' | 'balanced' | 'aggressive';
    budget: number; // USDC
    maxShareRisk: number; // %
    delegation: {
        signature: string;
        deadline: number;
        nonce: number;
    } | null;
    lastRun: number;
}

export const AgentDB = {
    getAll: (): AgentSettings[] => {
        try {
            if (!fs.existsSync(DB_PATH)) return [];
            const data = fs.readFileSync(DB_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (e) {
            console.error("Error reading DB:", e);
            return [];
        }
    },

    get: (userAddress: string): AgentSettings | null => {
        const all = AgentDB.getAll();
        return all.find(s => s.userAddress.toLowerCase() === userAddress.toLowerCase()) || null;
    },

    save: (settings: AgentSettings) => {
        try {
            const all = AgentDB.getAll();
            const index = all.findIndex(s => s.userAddress.toLowerCase() === settings.userAddress.toLowerCase());

            if (index >= 0) {
                all[index] = settings;
            } else {
                all.push(settings);
            }

            fs.writeFileSync(DB_PATH, JSON.stringify(all, null, 2));
        } catch (e) {
            console.error("Error saving DB:", e);
        }
    }
};

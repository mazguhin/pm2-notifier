import {registerAs} from "@nestjs/config";

export default registerAs('notifier', () => ({
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN,
    }
}));

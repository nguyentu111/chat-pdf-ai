CREATE TABLE `chats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pdf_name` varchar(256) NOT NULL,
	`pdf_url` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`user_id` varchar(256) NOT NULL,
	`file_key` text NOT NULL,
	CONSTRAINT `chats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chat_id` int NOT NULL,
	`content` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`role` enum('system','user') NOT NULL,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`stripe_customer_id` varchar(256) NOT NULL,
	`stripe_subscription_id` varchar(256),
	`stripe_price_id` varchar(256),
	`stripe_current_period_ended_at` timestamp,
	CONSTRAINT `user_subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_subscriptions_user_id_unique` UNIQUE(`user_id`),
	CONSTRAINT `user_subscriptions_stripe_customer_id_unique` UNIQUE(`stripe_customer_id`),
	CONSTRAINT `user_subscriptions_stripe_subscription_id_unique` UNIQUE(`stripe_subscription_id`)
);
--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_chat_id_chats_id_fk` FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON DELETE no action ON UPDATE no action;
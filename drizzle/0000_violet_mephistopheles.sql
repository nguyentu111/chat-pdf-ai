CREATE TABLE `accounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`account_type` text NOT NULL,
	`github_id` varchar(255),
	`google_id` varchar(255),
	`password` text,
	`salt` text,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `accounts_github_id_unique` UNIQUE(`github_id`),
	CONSTRAINT `accounts_google_id_unique` UNIQUE(`google_id`)
);
--> statement-breakpoint
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
CREATE TABLE `magic_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`token` text,
	`token_expires_at` timestamp NOT NULL,
	CONSTRAINT `magic_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `magic_links_email_unique` UNIQUE(`email`)
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
CREATE TABLE `profile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`display_name` text,
	`image_id` text,
	`image` text,
	`bio` text NOT NULL DEFAULT (''),
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profile_id` PRIMARY KEY(`id`),
	CONSTRAINT `profile_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `reset_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`token` text,
	`token_expires_at` timestamp NOT NULL,
	CONSTRAINT `reset_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `reset_tokens_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255),
	`email_verified` timestamp,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `verify_email_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`token` text,
	`token_expires_at` timestamp NOT NULL,
	CONSTRAINT `verify_email_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `verify_email_tokens_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_chat_id_chats_id_fk` FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profile` ADD CONSTRAINT `profile_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reset_tokens` ADD CONSTRAINT `reset_tokens_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `verify_email_tokens` ADD CONSTRAINT `verify_email_tokens_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;
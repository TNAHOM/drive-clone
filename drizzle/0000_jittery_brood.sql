CREATE TABLE `drive_clone_v2_files_table` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`owner_id` text NOT NULL,
	`name` text NOT NULL,
	`size` int NOT NULL,
	`url` text NOT NULL,
	`parent` bigint unsigned NOT NULL,
	CONSTRAINT `drive_clone_v2_files_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `drive_clone_v2_folders_table` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`owner_id` text NOT NULL,
	`parent` bigint unsigned,
	CONSTRAINT `drive_clone_v2_folders_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `parent_index` ON `drive_clone_v2_files_table` (`parent`);--> statement-breakpoint
CREATE INDEX `owner_id_index` ON `drive_clone_v2_files_table` (`owner_id`);--> statement-breakpoint
CREATE INDEX `parent_index` ON `drive_clone_v2_folders_table` (`parent`);--> statement-breakpoint
CREATE INDEX `owner_id_index` ON `drive_clone_v2_folders_table` (`owner_id`);
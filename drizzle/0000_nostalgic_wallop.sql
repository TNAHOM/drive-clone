CREATE TABLE `drive-clone-v2_files_table` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`size` text NOT NULL,
	`url` text NOT NULL,
	`parent` bigint unsigned NOT NULL,
	CONSTRAINT `drive-clone-v2_files_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `drive-clone-v2_folders_table` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`parent` bigint unsigned,
	CONSTRAINT `drive-clone-v2_folders_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `parent_index` ON `drive-clone-v2_files_table` (`parent`);--> statement-breakpoint
CREATE INDEX `parent_index` ON `drive-clone-v2_folders_table` (`parent`);
variable "aws_region"          { type = string; default = "ap-northeast-1" }
variable "env"                  { type = string; description = "dev | prod" }
variable "project"              { type = string; default = "webapp" }
variable "vpc_cidr"             { type = string; default = "10.0.0.0/16" }
variable "single_nat_gw"        { type = bool;   default = false; description = "true=dev(1 NAT), false=prod(2 NATs)" }
variable "db_name"              { type = string; default = "appdb" }
variable "db_master_password"   { type = string; sensitive = true }
variable "aurora_min_acu"       { type = number; default = 0.5 }
variable "aurora_max_acu"       { type = number; default = 16 }
variable "acm_certificate_arn"  { type = string; description = "ACM certificate ARN for HTTPS listener" }
variable "container_image"      { type = string; description = "ECR image URI (e.g. 123456789.dkr.ecr.ap-northeast-1.amazonaws.com/api:latest)" }
variable "task_cpu"             { type = string; default = "512" }
variable "task_memory"          { type = string; default = "1024" }
variable "ecs_min_tasks"        { type = number; default = 1 }
variable "ecs_max_tasks"        { type = number; default = 2 }
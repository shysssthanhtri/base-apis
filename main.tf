terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {}
}

provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_ecr_repository" "ecr" {
  name                 = join("-", [var.project_name, "ecr"])
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    "Terraform" : "True"
  }
}

# resource "aws_ecs_cluster" "ecs" {
#   name = join("-", [var.project_name, "ecs"])

#   setting {
#     name  = "containerInsights"
#     value = "enabled"
#   }

#   tags = {
#     "Terraform" : "True"
#   }
# }

# data "aws_iam_role" "ecsTaskExecutionRole" {
#   name = "ecsTaskExecutionRole"
# }

# resource "aws_ecs_task_definition" "task_definition" {
#   family = join("-", [var.project_name, "task_definition"])
#   container_definitions = jsonencode([
#     {
#       name   = join("-", [var.project_name, "container"])
#       image  = aws_ecr_repository.ecr.repository_url
#       cpu    = 256
#       memory = 512
#       # memoryReservation = 128
#       essential = true
#       portMappings = [
#         {
#           containerPort = var.container_port
#           hostPort      = var.container_port
#         }
#       ]
#     }
#   ])

#   requires_compatibilities = ["FARGATE"] # Stating that we are using ECS Fargate
#   network_mode             = "awsvpc"    # Using awsvpc as our network mode as this is required for Fargate
#   cpu                      = 256
#   memory                   = 512
#   execution_role_arn       = data.aws_iam_role.ecsTaskExecutionRole.arn

#   tags = {
#     "Terraform" : "true"
#   }
# }

# resource "aws_default_vpc" "default_vpc" {
# }

# # Providing a reference to our default subnets
# resource "aws_default_subnet" "default_subnet_a" {
#   availability_zone = "us-east-1a"
# }

# resource "aws_default_subnet" "default_subnet_b" {
#   availability_zone = "us-east-1b"
# }

# resource "aws_lb_target_group" "target_group" {
#   //  Let Terraform handle
#   # name        = join("-", [var.project_name, "target_group"])
#   port        = 80
#   protocol    = "HTTP"
#   target_type = "ip"
#   vpc_id      = aws_default_vpc.default_vpc.id
#   health_check {
#     matcher = "200,301,302"
#     path    = "/"
#   }
#   tags = {
#     "Terraform" : "true"
#     "Name" : join("-", [var.project_name, "target_group"])
#   }
# }

# resource "aws_security_group" "load_balancer_security_group" {
#   //  Request in
#   ingress {
#     from_port   = 80 # Allowing traffic in from port 80
#     to_port     = 80
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"] # Allowing traffic in from all sources
#   }

#   // Request out
#   egress {
#     from_port   = 0             # Allowing any incoming port
#     to_port     = 0             # Allowing any outgoing port
#     protocol    = "-1"          # Allowing any outgoing protocol 
#     cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
#   }

#   tags = {
#     "Name" = join("-", [var.project_name, "load_balancer_security_group"])
#     "Terraform" : "true"
#   }
# }

# resource "aws_alb" "application_load_balancer" {
#   //  Let Terraform handle
#   # name               = join("-", [var.project_name, "application_load_balancer"])
#   load_balancer_type = "application"
#   subnets = [ # Referencing the default subnets
#     aws_default_subnet.default_subnet_a.id,
#     aws_default_subnet.default_subnet_b.id
#   ]
#   # Referencing the security group
#   security_groups = [
#     aws_security_group.load_balancer_security_group.id
#   ]

#   tags = {
#     "Terraform" : "true"
#     "Name" : join("-", [var.project_name, "application_load_balancer"])
#   }
# }

# resource "aws_security_group" "service_security_group" {
#   ingress {
#     from_port = 0
#     to_port   = 0
#     protocol  = "-1"
#     # Only allowing traffic in from the load balancer security group
#     security_groups = [
#       "${aws_security_group.load_balancer_security_group.id}"
#     ]
#   }

#   egress {
#     from_port   = 0             # Allowing any incoming port
#     to_port     = 0             # Allowing any outgoing port
#     protocol    = "-1"          # Allowing any outgoing protocol 
#     cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
#   }

#   tags = {
#     "Name" = join("-", [var.project_name, "service_security_group"])
#     "Terraform" : "true"
#   }
# }

# resource "aws_ecs_service" "service" {
#   name            = join("-", [var.project_name, "service"])
#   cluster         = aws_ecs_cluster.ecs.id
#   task_definition = aws_ecs_task_definition.task_definition.arn
#   desired_count   = 1
#   launch_type     = "FARGATE"

#   load_balancer {
#     target_group_arn = aws_lb_target_group.target_group.arn # Referencing our target group
#     container_name   = join("-", [var.project_name, "container"])
#     container_port   = var.container_port # Specifying the container port
#   }

#   network_configuration {
#     subnets = [
#       aws_default_subnet.default_subnet_a.id,
#       aws_default_subnet.default_subnet_b.id
#     ]
#     assign_public_ip = true # Providing our containers with public IPs
#     security_groups = [
#       aws_security_group.service_security_group.id
#     ]
#   }

#   tags = {
#     "Terraform" : "true"
#   }
# }

# # Listener
# resource "aws_lb_listener" "listener" {
#   load_balancer_arn = aws_alb.application_load_balancer.arn
#   port              = "80"
#   protocol          = "HTTP"
#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.target_group.arn # Referencing our tagrte group
#   }

#   tags = {
#     "Name" = join("-", [var.project_name, "listener"])
#     "Terraform" : "true"
#   }
# }

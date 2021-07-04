variable "aws_region" {
  # default = "us-east-1"
  type = string
}

variable "ingress_rules" {
  type    = list(number)
  default = [3000, 22, 443]
}

variable "project_name" {
  default = "remote_config"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_pair_name" {
  default = "devops"
}

variable "container_port" {
  default = 3000
}

variable "aws_access_key" {
  type = string
}

variable "aws_secret_key" {
  type = string
}

variable "aws_region" {
  default = "us-east-1"
}

variable "ingress_rules" {
  type    = list(number)
  default = [3000, 22, 443, 80, 8080]
}

variable "project_name" {
  default = "remote-config"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_pair_name" {
  default = "devops"
}

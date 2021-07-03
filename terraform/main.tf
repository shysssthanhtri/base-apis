terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

data "aws_ami" "amzn2" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-2.0*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  owners = ["amazon"] # Canonical
}

resource "aws_security_group" "sg" {
  name        = join("_", [var.project_name, "sg"])
  description = "Allow ssh and standard http/https ports inbound and everything outbound"

  dynamic "ingress" {
    iterator = port
    for_each = var.ingress_rules
    content {
      from_port   = port.value
      to_port     = port.value
      protocol    = "TCP"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    "Terraform" = "true"
  }
}

resource "aws_instance" "instance" {

  ami             = data.aws_ami.amzn2.id
  instance_type   = var.instance_type
  security_groups = [aws_security_group.sg.name]
  key_name        = var.key_pair_name

  # provisioner "remote-exec" {
  #   inline = [
  #     "sudo yum update -y",
  #     "sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo",
  #     "sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key",
  #     "sudo yum upgrade",
  #     "sudo yum install jenkins java-1.8.0-openjdk-devel -y",
  #     "sudo systemctl daemon-reload",
  #     "sudo systemctl start jenkins",
  #     "sudo systemctl status jenkins",
  #   ]
  # }

  # connection {
  #   type        = "ssh"
  #   host        = self.public_ip
  #   user        = "ec2-user"
  #   private_key = file("./devops.pem")
  # }

  tags = {
    "Name"      = join("_", [var.project_name, "instance"])
    "Terraform" = "true"
  }
}


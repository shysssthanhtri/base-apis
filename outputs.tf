variable "test" {
  default = "test"
}

output "aws_ecr_name" {
  # value = aws_ecr_repository.ecr.name
  value = var.test
}
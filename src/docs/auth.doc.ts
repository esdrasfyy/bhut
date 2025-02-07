import { regex_alphanumeric, regex_email, regex_password } from "utils/regex.util";
import { ApiProperty } from "@nestjs/swagger";

export class LoginSwagger {
  @ApiProperty({
    description: "email or username",
    example: "johndoe@gmail.com",
  })
  credential: typeof regex_alphanumeric;

  @ApiProperty({
    description: "password",
    example: "@12345679Aa",
  })
  password: typeof regex_password;
}

export class ForgotPasswordSwagger {
  @ApiProperty({
    description: "email",
    example: "johndoe@gmail.com",
  })
  email: typeof regex_email;
}
export class ResetPasswordSwagger {
  @ApiProperty({
    description: "email",
    example: "johndoe@gmail.com",
  })
  email: typeof regex_email;

  @ApiProperty({
    description: "password",
    example: "@12345679Aa",
  })
  password: typeof regex_password;

  @ApiProperty({
    description: "token",
    example: "token JWT",
  })
  token: string;
}

export class RegisterSwagger {
  @ApiProperty({
    description: "email",
    example: "johndoe@gmail.com",
  })
  email: typeof regex_email;

  @ApiProperty({
    description: "username",
    example: "johndoe123",
  })
  username: typeof regex_alphanumeric;

  @ApiProperty({
    description: "password",
    example: "@12345679Aa",
  })
  password: typeof regex_password;
}

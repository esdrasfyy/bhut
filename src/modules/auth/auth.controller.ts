// import { Controller, Get, Post, Body, Res, Req } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { isPublic } from "../../decorators/public.decorator";
// import { Response as ExpressResponse, Request as ExpressRequest } from "express";
// import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
// import { ForgotPasswordSwagger, LoginSwagger, RegisterSwagger, ResetPasswordSwagger } from "../../docs/auth.doc";

// @ApiTags("Auth")
// @Controller("auth")
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @isPublic()
//   @Post("register")
//   @ApiOperation({ summary: "create user and returns decrypted user data via cookies." })
//   @ApiResponse({ status: 201, description: "user created and logged.", type: LoginSwagger })
//   @ApiResponse({ status: 409, description: "data already exists" })
//   @ApiResponse({ status: 400, description: "incorrect field." })
//   @ApiBody({ type: RegisterSwagger })
//   async register(@Res() res: ExpressResponse, @Body() dto: Auth.Register) {
//     await this.authService.register(dto, res);
//   }

//   @isPublic()
//   @Post("login")
//   @ApiOperation({ summary: "returns decrypted user data via cookies." })
//   @ApiResponse({ status: 200, description: "user logged.", type: LoginSwagger })
//   @ApiResponse({ status: 404, description: "not found user." })
//   @ApiResponse({ status: 401, description: "incorrect password." })
//   @ApiResponse({ status: 400, description: "incorrect field." })
//   @ApiBody({ type: LoginSwagger })
//   async login(@Res() res: ExpressResponse, @Body() dto: Auth.Login) {
//     await this.authService.login(dto, res);
//   }

//   @isPublic()
//   @Get("me")
//   @ApiOperation({ summary: "capture user session and return via body" })
//   @ApiResponse({ status: 200, description: "data captured and returned." })
//   @ApiResponse({ status: 400, description: "logged out user." })
//   async getMe(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
//     await this.authService.authenticate(res, req);
//   }

//   @isPublic()
//   @Post("forgot-password")
//   @ApiOperation({ summary: "Request a password reset link for the user.", description: "This endpoint allows users to request a password reset link by providing their registered email address. If the email is valid and associated with an account, a password reset link will be sent to that email." })
//   @ApiResponse({ status: 200, description: "Password reset link sent successfully.", type: ForgotPasswordSwagger })
//   @ApiResponse({ status: 404, description: "No account found associated with the provided email." })
//   @ApiResponse({ status: 400, description: "The provided email is not valid or the request contains incorrect fields." })
//   @ApiResponse({ status: 500, description: "An internal server error occurred." })
//   @ApiBody({ type: ForgotPasswordSwagger, description: "The request body should contain the user's email address in the format: { email: string }." })
//   async forgotPassword(@Res() res: ExpressResponse, @Body() dto: Auth.ForgotPassword) {
//     await this.authService.forgotPassword(res, dto);
//   }

//   @isPublic()
//   @Post("reset-password")
//   @ApiOperation({ summary: "Reset the user's password using a token.", description: "This endpoint allows users to reset their password by providing a valid token and a new password. The token must match the email associated with the account." })
//   @ApiResponse({ status: 200, description: "Password reset successfully." })
//   @ApiResponse({ status: 400, description: "The provided token is expired, invalid, or the email does not match." })
//   @ApiResponse({ status: 404, description: "User account not found for the provided email." })
//   @ApiResponse({ status: 500, description: "An internal server error occurred." })
//   @ApiBody({ type: ResetPasswordSwagger, description: "The request body should contain the reset token and new password in the format: { token: string, email: string, password: string }." })
//   async resetPassword(@Res() res: ExpressResponse, @Body() dto: Auth.ResetPassword) {
//     await this.authService.resetPassword(res, dto);
//   }
// }

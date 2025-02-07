// import { generateUsername, regex_email, regex_password, regex_username } from "../../utils/regex.util";
// import { GetGithubOAuthTokens, GetGithubUser } from "../../services/github.service";
// import { Response as ExpressResponse, Request as ExpressRequest } from "express";
// import { GetGoogleOAuthToken, GetGoogleUser } from "../../services/google.service";
// import { ValidateFields, ValidationRule } from "../../utils/validate-fields.util";
// import { GetSessionToken, LoginUser } from "../../services/cookies.service";
// import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { PasswordResetHtml } from "../../templates/password-reset";
// import { HandleErrors } from "../../utils/handle-errors-database";
// import { MailerService } from "../../services/mailer.sevice";
// import { verify } from "jsonwebtoken";
// import { AuthRepository } from "../../repository";
// import * as bcrypt from "bcrypt";

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly authRepository: AuthRepository,
//     private readonly mailer: MailerService
//   ) {}

//   async register(dto: Auth.Register, res: ExpressResponse) {
//     try {
//       const validators: { [key in keyof Auth.Register]: ValidationRule } = {
//         username: { regex: regex_username, message: "username can only contain letters, numbers, and underscores.", optional: false },
//         email: { regex: regex_email, message: "must be a valid email!", optional: false },
//         password: { regex: regex_password, message: "password needs an uppercase, lowercase, number, and special character ($, @, #).", optional: false },
//       };
// // 
//       ValidateFields(dto, validators);

//       const salt = await bcrypt.genSalt(10);
//       const passwordHash = await bcrypt.hash(dto.password, salt);
//       dto.password = passwordHash;
//       const user = await this.authRepository.create(dto);

//       LoginUser(res, user);

//       return res.status(HttpStatus.CREATED).json(user);
//     } catch (error) {
//       HandleErrors(error);
//     }
//   }

//   async login(dto: Auth.Login, res: ExpressResponse) {
//     try {
//       const validators: { [key in keyof Auth.Login]: ValidationRule } = {
//         credential: { regex: null, message: "must be a valid credential!", optional: false },
//         password: { regex: regex_password, message: "password needs an uppercase, lowercase, number, and special character ($, @, #).", optional: false },
//       };

//       ValidateFields(dto, validators);

//       const user = await this.authRepository.findByCredential(dto.credential);

//       if (!user) {
//         throw new HttpException("user not found.", HttpStatus.NOT_FOUND);
//       }

//       const isValidPassword = await bcrypt.compare(dto.password, user.password);

//       if (!isValidPassword) {
//         throw new HttpException("incorrect password.", HttpStatus.UNAUTHORIZED);
//       }

//       LoginUser(res, user);

//       return res.status(HttpStatus.OK).json(user);
//     } catch (error) {
//       HandleErrors(error);
//     }
//   }

//   async authenticate(res: ExpressResponse, req: ExpressRequest) {
//     const user = GetSessionToken(res, req);

//     return res.status(HttpStatus.OK).json(user);
//   }

//   async github(res: ExpressResponse, req: ExpressRequest) {
//     const { code } = req.query;
//     try {
//       if (!code) {
//         throw new Error("don't have the code.");
//       }

//       const accessToken = await GetGithubOAuthTokens(code as string);

//       const user_github: Auth.GithubUserResult | undefined = await GetGithubUser(accessToken);

//       let user = await this.authRepository.findByGithubID(user_github.id);

//       if (!user) {
//         user = await this.authRepository.create({ github_id: String(user_github.id), username: generateUsername(), avatar: user_github.avatar_url, fullname: user_github.name });
//       }

//       LoginUser(res, user);

//       return res.status(HttpStatus.OK).redirect(process.env.APP_URL);
//     } catch (error: any) {
//       HandleErrors(error);
//     }
//   }

//   async google(res: ExpressResponse, req: ExpressRequest) {
//     const { code } = req.query;
//     try {
//       if (!code) {
//         throw new Error("don't have the code.");
//       }

//       const { access_token, id_token } = await GetGoogleOAuthToken(code as string);

//       const user_google = await GetGoogleUser(access_token, id_token);

//       let user = await this.authRepository.findGoogleAccount(user_google.id, user_google.email);
//       if (!user) {
//         user = await this.authRepository.create({ google_id: String(user_google.id), email: user_google.email, username: generateUsername(), avatar: user_google.picture });
//       }

//       LoginUser(res, user);

//       return res.status(HttpStatus.OK).redirect(process.env.APP_URL);
//     } catch (error: any) {
//       HandleErrors(error);
//     }
//   }

//   async forgotPassword(res: ExpressResponse, dto: Auth.ForgotPassword) {
//     try {
//       if (!regex_email.test(dto.email)) {
//         throw new Error("must be a valid email!");
//       }

//       const user = await this.authRepository.findAccountByEmail(dto.email);

//       if (!user) {
//         throw new HttpException("account not found.", HttpStatus.NOT_FOUND);
//       }

//       const token = await this.authRepository.createPasswordReset(dto.email, user.id);

//       const link = `http://localhost:3000/password/reset/${token.token}`;
//       const html = await PasswordResetHtml(link);

//       this.mailer.Send({ email: dto.email, html, subject: "redefinicao da senha" });

//       return res.status(200).end();
//     } catch (error) {
//       HandleErrors(error);
//     }
//   }

//   async resetPassword(res: ExpressResponse, dto: Auth.ResetPassword) {
//     try {
//       const { email, id } = verify(dto.token, process.env.SECRET) as { email: string; id: number };

//       if (email !== dto.email) {
//         throw new HttpException("the emails do not match.", HttpStatus.BAD_REQUEST);
//       }

//       const { used } = await this.authRepository.getTokenResetPassword(dto.token);

//       if (used) {
//         throw new Error("the link is expired or invalid.");
//       }

//       const salt = await bcrypt.genSalt(12);
//       const password = await bcrypt.hash(dto.password, salt);

//       await this.authRepository.updatePassword(id, password, dto.token);

//       // mail of success

//       return res.status(200).end();
//     } catch {
//       throw new HttpException("the link is expired or invalid.", HttpStatus.BAD_REQUEST);
//     }
//   }
// }

import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JwtService {
    options: any;
    privateKEY: string;
    publicKEY: string;
  constructor() {
    // use 'utf8' to get string instead of byte array  (512 bit key)
    this.publicKEY  = `
    -----BEGIN PUBLIC KEY-----
    MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKr3a/5OecmH86d/MIsZDFO6HkTPgiXv
    m1hAd0AaeqvOm2pfX06G6X29fIkOcSTh+n5YFzau2wr8vw823/orI2ECAwEAAQ==
    -----END PUBLIC KEY-----
    `;
  }

  verify (token, parameters) {
    !parameters ? this.options = {
      issuer: "Authorizaxtion/Resource/This server",
      subject: "iam@user.me",
      audience: "Client_Identity" // this should be provided by client
    } : this.options = parameters;

    var verifyOptions = {
      issuer:  this.options.issuer,
      subject:  this.options.subject,
      audience:  this.options.audience,
      expiresIn:  "30d",
      algorithm:  ["RS256"]
    };
    try{
      return jwt.verify(token, this.publicKEY, verifyOptions);
    }catch (err){
     return false;
    }
  }

  decode(token) {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
  }
}
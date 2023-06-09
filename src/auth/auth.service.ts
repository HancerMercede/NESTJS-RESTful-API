/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { CompareHash, GenerateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly _jwtservice: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    public async Login(UserLoginBody: LoginAuthDto) {
        const userExist = await this.userModel.findOne({ email: UserLoginBody.email });

        const { password } = UserLoginBody;
        const isCheck = await CompareHash(password, userExist.password);

        if (!userExist)
            throw new HttpException('This user does not exists in the db, please verify.', HttpStatus.NOT_FOUND);

        if (!isCheck)
            throw new HttpException('Invalid_password, check your password.', HttpStatus.CONFLICT);

        const UserDto = userExist.toObject();
        delete UserDto.password;

        const token = this._jwtservice.sign(UserDto);
        const Data = {
            token,
            user: UserDto
        }
        this.eventEmitter.emit('user.login', Data);
        return Data;
    }
    public async Register(userbody: RegisterAuthDto) {
        const { password, ...user } = userbody;

        const userParse = {
            ...user,
            password: await GenerateHash(password)
        }

        const newUser = await this.userModel.create(userParse);


        this.eventEmitter.emit('user.created', newUser);

        return newUser;
    }
}

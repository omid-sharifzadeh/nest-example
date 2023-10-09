import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty({
        description: 'email',
        example: 'john.doe@gmail.com'
    })
    email: string
    
    @ApiProperty({
        description: 'password',
        example: 'pass123'
    })
    password: string
}

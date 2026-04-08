import { SetMetadata } from '@nestjs/common';

//It return SetMetadata('isPublic', true)
// In place of @Public() you use `SetMetadata('isPublic', true)`
export const Public = () => SetMetadata('isPublic', true);

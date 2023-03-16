import { authGuard } from '$lib/auth/auth';
import { Amplify } from 'aws-amplify';
import awsmobile from '../aws-exports';
Amplify.configure(awsmobile);


authGuard().initIsLogged();
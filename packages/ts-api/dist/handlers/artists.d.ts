import { Request, Response } from 'express';
export declare function createArtistProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateArtistProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getArtistProfiles(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getArtistProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;

import {HttpLibrary, RequestContext, ResponseContext} from './http';
import { from, Observable} from '../rxjsStub';
import "whatwg-fetch";

export class IsomorphicFetchHttpLibrary implements HttpLibrary {
    
    public send(request: RequestContext): Observable<ResponseContext> {
        let method = request.getHttpMethod().toString();
        let body = request.getBody();

        const resultPromise = fetch(request.url, {
            method: method,
            body: body as any,
            headers: request.getHeaders(),
            credentials: 'include'
        }).then((response : any) => {
            const headers: {[name: string]: string} = {};
            response.headers.forEach((value: string, name: string) => {
                headers[name] = value;
            });

            const body = {
                text: () => response.text(),
                binary: () => response.blob()
            };
            return new ResponseContext(response.status, headers, body);
        });

        return from<Promise<ResponseContext>>(resultPromise);
        
    }
}
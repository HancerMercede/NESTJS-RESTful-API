import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  WelcomeNest(): developer {
    // return 'Nest.js is the new amazing tool for me.';
    const persona = new developer();
    persona.id = 22;
    persona.name = 'hancer antonio';
    persona.tools = ['c#', '.net'];

    return persona;
  }
}

export class developer {
  id: number;
  name: string;
  tools: string[];
}

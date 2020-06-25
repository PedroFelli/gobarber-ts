import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplatePropvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

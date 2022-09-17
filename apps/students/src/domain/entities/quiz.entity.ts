// Entities
import { BaseEntity } from './base/base.entity';
import { QuestionEntity } from './question.entity';

// TODO: Se debe de profundizar en el tema de las preguntas, el tipo de pregunta y cómo se almacena la respuesta
export interface QuizEntity extends BaseEntity {
  name: string;
  description: string;
  questions: QuestionEntity[];
}

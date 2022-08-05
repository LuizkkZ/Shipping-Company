import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class IBaseTypeormTable {
  @Column({ name: 'FL_SITUACAO', default: 2 })
  flSituacao: number;

  @CreateDateColumn({ name: 'DT_CADASTRO' })
  dtCadastro: Date;

  @Column({ name: 'ID_USUARIO_CADASTRO', default: null })
  idUsuarioCadastro: string;

  dsUsuarioCadastro?: string;

  @UpdateDateColumn({ name: 'DT_ALTERACAO' })
  dtAlteracao?: Date;

  @Column({ name: 'ID_USUARIO_ALTERACAO', default: null })
  idUsuarioAlteracao?: string;

  @Column({ name: 'DS_USUARIO_ALTERACAO', default: null })
  dsUsuarioAlteracao?: string;
}

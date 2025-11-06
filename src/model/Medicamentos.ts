import type { MedicamentosDTO } from "../interface/MedicamentosDTO.js";
import { DatabaseModel } from "./DataBaseModel.js";

const database = new DatabaseModel().pool; 

class Medicamentos {
  private idMedicamento: number = 0;
  private nome: string;
  private fabricante: string;
  private principio_ativo: string;
  private data_validade: number;
  private preco: number;

  /**
   * Construtor da classe medicamento
   * @param _nome Nome do medicamento
   * @param _fabricante CPF do medicamento
   * @param _principio_ativo Telefone do medicamento
   * @param _data_validade Ano do medicamento
   * @param _preco Cor do medicamento
   */
  constructor(_nome: string, _fabricante: string, _principio_ativo: string, _data_validade: number, _preco: number) {
    this.nome = _nome;
    this.fabricante = _fabricante;
    this.principio_ativo = _principio_ativo;
    this.data_validade = _data_validade;
    this.preco = _preco;
  }

  /**
   * Retorna o ID do medicamento
   * @returns ID do medicamento
   */
  public getIdMedicamento(): number {
    return this.idMedicamento;
  }

  /**
   * Atribui um ID ao medicamento
   * @param idMedicamento novo ID
   */
  public setIdMedicamento(idMedicamento: number): void {
    this.idMedicamento = idMedicamento;
  }

  /**
   * Retorna o nome do medicamento
   * @returns Nome do medicamento
   */
  public getNome(): string {
    return this.nome;
  }

  /**
   * Atribui um nome ao medicamento
   * @param nome novo nome do medicamento
   */
  public setNome(nome: string): void {
    this.nome = nome;
  }

  /**
   * Retorna o CPF do medicamento
   * @returns CPF do medicamento
   */
  public getFabricantes(): string {
    return this.fabricante;
  }

  /**
   * Atribui um CPF ao medicamento
   * @param fabricante novo CPF do medicamento
   */
  public setFabricante(fabricante: string): void {
    this.fabricante = fabricante;
  }

  /**
   * Retorna o telefone do medicamento
   * @returns Telefone do medicamento
   */
  public getprincipioAtivo(): string {
    return this.principio_ativo;
  }

  /**
   * Atribui um telefone ao medicamento
   * @param principio_ativo telefone do medicamento
   */
  public setprincipioAtivo(principio_ativo: string): void {
    this.principio_ativo = principio_ativo;
  }

  public getDataValidade(): number {
    return this.data_validade;
  }

  public setDataValidade(data_validade: number): void {
    this.data_validade = data_validade;
  }
  /**
    
     * @returns 
     * @returns 
     */
  static async listarMedicamento(): Promise<Array<Medicamentos> | null> {
    try {
      let listaDeMedicamentos: Array<Medicamentos> = [];

      const querySelectMedicamento = `SELECT * FROM medicamentos;`;

      const respostaBD = await database.query(querySelectMedicamento);


      respostaBD.rows.forEach((MedicamentosBD) => {
        const novoMedicamento: Medicamentos = new Medicamentos(
          MedicamentosBD.nome,
          MedicamentosBD.fabricante,
          MedicamentosBD.principio_ativo,
          MedicamentosBD.data_validade,
          MedicamentosBD.preco
        );

        novoMedicamento.setIdMedicamento(MedicamentosBD.id_Medicamento);

        listaDeMedicamentos.push(novoMedicamento);
      });

      return listaDeMedicamentos;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);

      return null;
    }
  }
static async cadastrarMedicamento(Medicamentos: MedicamentosDTO): Promise<boolean> {
    try {
      const queryInsertMedicamentos = `
                INSERT INTO Medicamentos (nome, fabricante, principio_ativo, data_validade, preco) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id_Medicamento;
            `;

      const respostaBD = await database.query(queryInsertMedicamentos, [
        Medicamentos.nome.toUpperCase(),
        Medicamentos.fabricante,
        Medicamentos.principio_ativo,
        Medicamentos.data_validade,
        Medicamentos.preco,
      ]);

      if (respostaBD.rows.length > 0) {
        console.info(
          `Medicamento cadastrado com sucesso! ID: ${respostaBD.rows[0].id_Medicamento}`
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return false;
    }
  }
}

export default Medicamentos;

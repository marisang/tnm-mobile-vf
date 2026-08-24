// Template do "TERMO DE AUTORIZAÇÃO PARA USO DE IMAGEM E VOZ".
// Mesmo padrão do ContratoDistribuicaoTemplate.jsx: recebe `dados` e
// substitui os campos variáveis. Cole aqui o restante das cláusulas do
// seu arquivo AUTORIZACAO_PARA_O_USO_DE_IMAGEM.docx.

function AutorizacaoImagemTemplate({ dados }) {
  return (
    <div className="document-template">
      <h1>
        TERMO DE AUTORIZAÇÃO PARA USO DE IMAGEM DE ACORDO COM A LEI
        13.709/2018
      </h1>

      <p>
        Pelo presente Termo de Autorização para Uso de Imagem e Voz, Eu{' '}
        <strong>{dados.nomeCompleto}</strong>, com dados descritos a
        seguir, aqui denominado(a) como <strong>TITULAR</strong>, autorizo
        que <strong>TÔ NA MIDIA DIGITAL LTDA</strong>, pessoa jurídica de
        direito privado, inscrito no CNPJ 02.364.590/0001-67, neste ato
        representado por JOSÉ ANTONIO MEDEIROS FILHO, com sede na Rua
        Geremia Lunardelli 503, Jardim Peri Peri - São Paulo/SP,
        CEP: 05537-100, endereço eletrônico: tonamidia@tonamidia.com.br,
        em razão da prestação de serviços de mídia digital, disponha dos
        meus dados pessoais, de acordo com os artigos 7° e 11 da Lei n°
        13.709/2018, e também autorizo a utilização de minha imagem e/ou
        voz, consoante disposto neste instrumento.
      </p>

      <h2>CLÁUSULA PRIMEIRA</h2>
      <p>
        O TITULAR autoriza o CONTROLADOR a realizar o tratamento, ou
        seja, a utilizar os dados pessoais relacionados à divulgação de
        sua imagem e/ou voz, em áudio e vídeo, para finalidade de
        promoção da campanha publicitária de interesse do CONTROLADOR, ocorrendo a divulgação no seu site e demais mídias, online e offline, já existentes ou que venham a existir.
        <br></br>
        <br></br>
        Parágrafo Primeiro: A autorização ora pactuada é feita de forma inteiramente gratuita, nada havendo a ser pleiteado ou recebido do CONTROLADOR seja a que título for, ficando desde já ajustando que o TITULAR concorda que nada tem a reclamar com relação à autorização ora concedida, em Juízo ou fora dele.
        <br></br>
        <br></br>
        Parágrafo Segundo: Nenhuma das utilizações previstas no caput desta Cláusula, ou ainda qualquer outra que pretenda o CONTROLADOR dar às imagens e/ou vozes cuja utilização foi autorizada através deste Termo, têm limitação de tempo ou de número de vezes, podendo ocorrer no Brasil e/ou no exterior, sem que seja devida ao TITULAR qualquer remuneração.

      </p>

      <h2>CLÁUSULA SEGUNDA - Finalidade do Tratamento dos Dados</h2>
      <p>
        O Titular autoriza que o CONTROLADOR utilize sua imagem com a finalidade de divulgação de campanha publicitária de seu interesse, adotando todas as medidas de proteção de dados, visando a preservação de seu direito à intimidade, coibindo o uso com finalidade distinta prevista neste termo.
        <br></br>
        <br></br>
        Parágrafo Primeiro: Caso seja necessário o compartilhamento de dados com terceiros que não tenham sido relacionados nesse termo ou qualquer  alteração contratual posterior, será ajustado novo termo de consentimento para este fim (§ 6° do artigo 8° e § 2° do artigo 9° da Lei n° 13.709/2018).
        <br></br>
        <br></br>
        Parágrafo Segundo: Em caso de alteração na finalidade, que esteja em desacordo com o consentimento original, o CONTROLADOR deverá comunicar o TITULAR, que poderá revogar o consentimento, conforme previsto na cláusula sexta.
        <br></br>
        <br></br>
        Parágrafo Terceiro: O TITULAR se compromete a não inspecionar ou aprovar a arte final ou qualquer  material relacionado ao uso de sua imagem e/ou voz ora concedido, ficando acordado que o CONTROLADOR se obriga a não utilizar os direitos de sua personalidade de forma pejorativa ou distorcida.

      </p>

      <h2>CLÁUSULA TERCEIRA - Compartilhamento de Dados</h2>
      <p>
        Ao CONTROLADOR fica autorizada a compartilhar os dados pessoais do Titular com outros agentes de tratamento de dados, caso seja necessário para as finalidades previstas neste instrumento, desde que sejam respeitados os princípios da boa-fé, finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização e prestação de contas.

      </p>

      <h2>CLÁUSULA QUARTA - Responsabilidade pela Segurança dos Dados</h2>
      <p>
        Fica o CONTROLADOR responsabilizado por manter medidas de segurança, técnicas e administrativas suficientes a proteger os dados pessoais do Titular e à Autoridade Nacional de Proteção de Dados (ANPD), comunicando ao TITULAR, caso ocorra algum incidente de segurança que possa acarretar risco ou dano relevante, conforme artigo 48 da Lei n° 13.709/2020.
      </p>

      <h2>CLÁUSULA QUINTA - Término do Tratamento dos Dados</h2>
      <p>
        Ao  CONTROLADOR, é permitido manter e utilizar os dados pessoais do Titular durante todo o período contratualmente firmado para as finalidades relacionadas nesse termo e ainda após o término da contratação para cumprimento de obrigação legal ou impostas por órgãos de fiscalização, nos termos do artigo 16 da Lei n° 13.709/2018.
      </p>

      <h2>CLÁUSULA SEXTA - Direito de Revogação do Consentimento</h2>
      <p>
        O TITULAR poderá revogar seu consentimento, a qualquer tempo, por e-mail ou por carta escrita, conforme o artigo 8°, § 5°, da Lei n° 13.709/2020.

      </p>

      <h2>CLÁUSULA SÉTIMA - Tempo de Permanência dos Dados Recolhidos</h2>
      <p>
        O TITULAR fica ciente de que O CONTROLADOR deverá permanecer com os seus dados pelo período mínimo necessário à finalidade publicitária ora estabelecida.
      </p>


      <h2>Formulário de Termo de Concessão</h2>
      <table className="dados-titular-table">
        <tbody>
          <tr>
            <td>Nome</td>
            <td>{dados.nomeCompleto}</td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td>{dados.email}</td>
          </tr>
          <tr>
            <td>Celular</td>
            <td>{dados.celular}</td>
          </tr>
          <tr>
            <td>Data de nascimento</td>
            <td>{dados.dataNascimento}</td>
          </tr>
          <tr>
            <td>Nacionalidade</td>
            <td>{dados.nacionalidade}</td>
          </tr>
          <tr>
            <td>Documento de Identidade</td>
            <td>{dados.rg}</td>
          </tr>
          <tr>
            <td>Órgão Emissor</td>
            <td>{dados.orgaoEmissor}</td>
          </tr>
          <tr>
            <td>CPF</td>
            <td>{dados.cpf}</td>
          </tr>
          <tr>
            <td>Endereço</td>
            <td>{dados.endereco}</td>
          </tr>
          <tr>
            <td>Bairro</td>
            <td>{dados.bairro}</td>
          </tr>
          <tr>
            <td>Município</td>
            <td>{dados.municipio}</td>
          </tr>
          <tr>
            <td>UF</td>
            <td>{dados.uf}</td>
          </tr>
        </tbody>
      </table>

      <p className="assinatura-local-data">
        São Paulo, {dados.dataAssinatura}.
      </p>

      <div className="assinatura-bloco">
        <p>______________________________________________</p>
        <p>{dados.nomeCompleto}</p>
      </div>
    </div>
  )
}

export default AutorizacaoImagemTemplate
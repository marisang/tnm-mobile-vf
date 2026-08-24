import PropTypes from 'prop-types'

function ContratoEdicaoTemplate({ dados, obra }) {
  return (
    <div
      className="pdf-page"
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '11pt',
        lineHeight: '1.6',
        color: '#000',
        padding: '40px',
        backgroundColor: '#fff',
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '14pt', marginBottom: '20px', fontWeight: 'bold' }}>
        CONTRATO DE CESSÃO DE DIREITOS AUTORAIS
      </h1>

      <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
        <strong>{dados.nomeCompleto || 'XXXXXXXXXXXXXX'}</strong>, cujo pseudônimo artístico é{' '}
        <strong>{dados.pseudonimoArtistico || 'XXXXXXXX'}</strong>, {dados.nacionalidade || 'brasileiro'},{' '}
        {dados.estadoCivil || 'solteiro'}, compositor, portador da cédula de identidade n.º{' '}
        <strong>{dados.rg || 'XXXXXXXX'}</strong>, inscrito no CPF do MF sob n.º{' '}
        <strong>{dados.cpf || 'XXXXXXX'}</strong>, residente e domiciliado na{' '}
        <strong>{dados.endereco || 'Rua XXXXXXXXXXXXXXXXXX'}</strong>, doravante designado simplesmente{' '}
        <strong>AUTOR</strong>, de um lado, e <strong>TÔ NA MIDIA DIGITAL LTDA</strong>, com sede nesta Cidade à Rua 
        Geremia Lunardelli 503, Jardim Peri Peri, São Paulo/SP, Cep. 05537-100, inscrita no C.N.P.J./MF 
        02.364.590/0001-67, por seus representantes abaixo assinados, a seguir designada{' '}
        <strong>EDITORA</strong> do outro lado, têm entre si contratado o seguinte:
      </p>

      <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
        <strong>CLÁUSULA PRIMEIRA</strong> - O AUTOR, neste ato, cede e transfere à EDITORA, em caráter total e 
        definitivo, irrevogável e irretratável, na forma, extensão e aplicação em que os detêm, por força das leis e 
        tratados em vigor e que no futuro vierem a vigorar, por todo o prazo de duração da proteção ao direito de 
        autor, todos os seus direitos patrimoniais de autor sobre a(s) obra(s) musical(is) ou lítero-musical(is) 
        intitulada(s) <strong>"{obra?.titulo || 'XXXXXX'}"</strong>, de sua autoria e titularidade, com o respectivo 
        texto poético em anexo que também integra o presente, podendo a EDITORA, em caráter de exclusividade, 
        publicá-la e/ou autorizar sua publicação por terceiros, por qualquer forma ou processo.
      </p>

      {obra && (
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '16px',
            margin: '12px 0',
            borderLeft: '4px solid #6A1B9A',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            OBRA: {obra.titulo}
          </p>
          {obra.isrc && (
            <p style={{ margin: '4px 0 0 0', fontSize: '10pt', color: '#555' }}>ISRC: {obra.isrc}</p>
          )}
          {obra.duracao && (
            <p style={{ margin: '4px 0 0 0', fontSize: '10pt', color: '#555' }}>
              Duração: {obra.duracao}
            </p>
          )}
        </div>
      )}

      <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
        <strong>CLÁUSULA SEGUNDA</strong> - O território de aplicação deste contrato abrange o Brasil, todos os 
        demais países do mundo e o espaço exterior.
      </p>
      <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
        <strong>CLÁUSULA TERCEIRA</strong> - A presente cessão compreende todas as modalidades existentes de 
        utilização da obra, incluindo, mas não limitado a:
      </p>

      <p style={{ marginLeft: '20px', marginBottom: '16px' }}>
        - a reprodução parcial ou integral, inclusive a inclusão em base de dados, o armazenamento em computador, a 
        microfilmagem e, em geral, qualquer armazenamento permanente ou temporário por meios eletrônicos ou qualquer 
        outro meio de fixação que venha a ser desenvolvido;
        <br />
        - a edição;
        <br />
        - a adaptação, o arranjo musical e quaisquer outras transformações;
        <br />
        - a tradução para qualquer idioma;
        <br />
        - a inclusão em fonograma ou produção audio-visual;
        <br />
        - a cessão para inclusão em peças publicitárias, com a adaptação da letra e/ou música em publicidade gráfica, 
        sonora ou audio-visual;
        <br />
        - a distribuição, através da venda, locação ou qualquer outra forma de transferência de propriedade ou posse;
        <br />
        - a distribuição para oferta da obra mediante cabo, fibra ótica, satélite, ondas ou qualquer outro sistema que 
        permita ao usuário realizar a seleção da obra para percebê-la em um tempo e lugar previamente determinados por 
        quem formula a demanda, e nos casos em que o acesso à obra se faça por qualquer sistema que importe em 
        pagamento pelo usuário;
        <br />
        - a utilização, direta ou indireta, da obra, através de sua comunicação ao público, inclusive mediante: 
        representação; declamação ou recitação; execução musical; emprego de alto-falante ou de sistemas análogos; 
        radiodifusão sonora ou televisiva; captação de transmissão de radiodifusão em locais de freqüência coletiva; 
        sonorização ambiental; exibição audio-visual, cinematográfica ou por processo assemelhado; emprego de 
        satélites artificiais; emprego de sistemas óticos; fios eletrônicos ou não, cabos de qualquer tipo e meios 
        de comunicação similares que venham a ser adotados.
      </p>

      <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
        <strong>CLÁUSULA QUARTA</strong> - Em conseqüência da cessão ora contratada a EDITORA praticará, em nome 
        próprio, todos os atos necessários à exploração da obra objeto de cessão, por si ou mediante transferência a 
        terceiros por licenciamento, concessão, sub-cessão ou quaisquer outros meios admitidos em Direito, fixando 
        preço, retribuições, recebendo e dando quitações, efetuando os registros e depósitos que entender 
        convenientes e, no melhor de seus esforços e viabilidade, defendendo os direitos cedidos em juízo ou fora dele.
      </p>

      <div style={{ pageBreakBefore: 'always' }}>
        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA QUINTA</strong> - O presente contrato é celebrado a título oneroso, ficando assegurado o 
          AUTOR o direito de receber da EDITORA, como preço da cessão ora contratada, 10% (dez por cento) sobre o 
          valor de capa dos exemplares vendidos de edição gráfica impressos, seja no caso de partituras para 
          quaisquer instrumentos musicais e orquestras, ou de letras avulsas, desde que tais publicações sejam 
          patrocinadas pela própria EDITORA. Tratando-se de publicações que contenham peças de outros autores a 
          divisão será feita proporcionalmente ao número de obras. No caso das publicações gráficas serem promovidas 
          e custeadas por terceiros, o percentual devido será aquele estipulado na alínea da cláusula SEXTA. A 
          EDITORA poderá imprimir exemplares de propaganda de partituras, orquestradas ou para um só instrumento, nos 
          quais constem os dizeres "INVENDÁVEIS" ou "EXEMPLARES GRÁTIS" ou "VENDA PROIBIDA", na quantidade razoável 
          que julgar conveniente e sobre os quais não incidirá o percentual acima, por serem distribuídos gratuitamente.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA SEXTA</strong> - Ainda como preço da cessão ora contratada, perceberá ao AUTOR os 
          percentuais abaixo especificados, relativos aos resultados efetivamente recebidos pela EDITORA pela 
          exploração da obra procedida por terceiros através de licenciamento, concessão, sub-cessão ou qualquer 
          outro meio admitido em Direito, da forma seguinte:
        </p>

        <p style={{ marginBottom: '16px' }}>
          <strong>1) Direitos efetivamente recebidos pela exploração no Brasil:</strong>
        </p>

        <div style={{ marginLeft: '20px', marginBottom: '16px' }}>
          <p><strong>a) DIREITOS DE REPRODUÇÃO GRÁFICA (edição)</strong></p>
          <p>50% (cinqüenta por cento) para o AUTOR<br />50% (cinqüenta por cento) para a EDITORA</p>
          
          <p><strong>b) DIREITOS DE DISTRIBUIÇÃO FONOMECÂNICOS (venda e locação de gravações sonoras)</strong></p>
          <p>75% (setenta e cinco por cento) para o AUTOR<br />25% (vinte e cinco por cento) para a EDITORA</p>
          
          <p><strong>c) DIREITOS DE INCLUSÃO E ADAPTAÇÃO EM PRODUÇÕES AUDIO-VISUAIS</strong></p>
          <p>75% (setenta e cinco por cento) para o AUTOR<br />25% (vinte e cinco por cento) para a EDITORA</p>
          
          <p><strong>d) DIREITOS DE INCLUSÃO E ADAPTAÇÃO EM PRODUÇÕES PUBLICITÁRIAS GRÁFICAS, SONORAS OU AUDIO-VISUAIS, (melodia ou letra)</strong></p>
          <p>75% (setenta e cinco por cento) para o AUTOR<br />25% (vinte e cinco por cento) para a EDITORA</p>
          
          <p><strong>e) DIREITOS DE DISTRIBUIÇÃO MEDIANTE MEIOS ÓTICOS, CABO, SATÉLITES, REDES DE INFORMAÇÕES E DE COMPUTADORES, QUE PERMITAM AO USUÁRIO A SELEÇÃO DA OBRA OU QUE IMPORTE EM PAGAMENTO PELO USUÁRIO</strong></p>
          <p>75% (setenta e cinco por cento) para o AUTOR<br />25% (vinte e cinco por cento) para a EDITORA</p>
          
          <p><strong>f) DIREITOS DE INCLUSÃO EM BASE DE DADOS OU QUALQUER FORMA DE ARMAZENAMENTO</strong></p>
          <p>75% (setenta e cinco por cento) para o AUTOR<br />25% (vinte e cinco por cento) para a EDITORA</p>
          
          <p><strong>g) DIREITOS DE COMUNICAÇÃO AO PÚBLICO</strong></p>
          <p>75% (setenta e cinco por cento) para o AUTOR<br />25% (vinte e cinco por cento) para a EDITORA</p>
        </div>

        <p style={{ marginBottom: '16px' }}>
          <strong>2) Direitos auferidos pela exploração no exterior, aplicando-se a divisão sobre as quantias líquidas recebidas no Brasil e remetidas pelo sub-editor:</strong>
        </p>

        <div style={{ marginLeft: '20px', marginBottom: '16px' }}>
          <p><strong>a) DIREITOS DE REPRODUÇÃO GRÁFICA (edição)</strong></p>
          <p>50% (cinqüenta por cento) para o AUTOR<br />50% (cinqüenta por cento) para a EDITORA</p>
          
          <p><strong>b) DIREITOS DE DISTRIBUIÇÃO FONOMECÂNICA (venda e locação de gravações sonoras)</strong></p>
          <p>50% (cinqüenta por cento) para o AUTOR<br />50% (cinqüenta por cento) para a EDITORA</p>
          
          <p><strong>c) DIREITOS DE INCLUSÃO E ADAPTAÇÃO EM PRODUÇÕES AUDIO-VISUAIS</strong></p>
          <p>50% (cinqüenta por cento) para o AUTOR<br />50% (cinqüenta por cento) para a EDITORA</p>
          
          <p><strong>d) DIREITOS DE INCLUSÃO E ADAPTAÇÃO EM PRODUÇÕES PUBLICITÁRIAS, GRÁFICAS, SONORAS OU AUDIO-VISUAIS (melodia ou letra)</strong></p>
          <p>50% (cinqüenta por cento) para o AUTOR<br />50% (cinqüenta por cento) para a EDITORA</p>
          
          <p><strong>e) DIREITOS DE DISTRIBUIÇÃO MEDIANTE MEIOS ÓTICOS, CABO, SATÉLITES, REDES DE INFORMAÇÃO E DE COMPUTADORES, QUE PERMITAM AO USUÁRIO A SELEÇÃO DA OBRA OU QUE IMPORTE EM PAGAMENTO PELO USUÁRIO</strong></p>
          <p>50% (cinqüenta por cento) para o AUTOR<br />50% (cinqüenta por cento) para a EDITORA</p>
          
          <p><strong>f) DIREITOS DE INCLUSÃO EM BASE DE DADOS OU QUALQUER FORMA DE ARMAZENAMENTO</strong></p>
          <p>50% (cinqüenta por cento) para o AUTOR<br />50% (cinqüenta por cento) para a EDITORA</p>
          
          <p><strong>g) DIREITOS DE COMUNICAÇÃO AO PÚBLICO</strong></p>
          <p>50% (cinquenta por cento) para o AUTOR<br />50% (cinquneta por cento) para a EDITORA</p>
        </div>
      </div>

      <div style={{ pageBreakBefore: 'always' }}>
        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA SÉTIMA</strong> - A EDITORA procederá trimestralmente, de acordo com o calendário civil, a 
          liquidação dos direitos eventualmente devidos a AUTORA, acompanhada dos respectivos demonstrativos, 
          mencionado a fonte pagadora, o período a que se refere o crédito, o título da obra e o valor de cada 
          crédito, devendo efetuá-la dentro dos 60 (sessenta) dias posteriores ao fim de cada trimestre.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA OITAVA</strong> - Deixando a EDITORA de apresentar os demonstrativos referentes a 
          liquidação dos direitos efetivamente recebidos até 60 (sessenta) dias após o encerramento do trimestre do 
          calendário civil, poderá o AUTOR notificá-la para que a mesma preste contas dentro do prazo de 30 (trinta) 
          dias, contados do recebimento da notificação, sob pena de serem tais contas exigidas judicialmente, correndo 
          todas as despesas judiciais por conta da EDITORA, inclusive honorários de advogado.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA NONA</strong> - A presente cessão abarca os direitos patrimoniais do AUTOR, sobre a obra de 
          sua autoria, expressamente excluídos os direitos de natureza moral, tal como definidos no artigo 24 da Lei 
          9.610/98, os quais, em virtude de seu caráter personalíssimo, permanecem integralmente investido na pessoa 
          do AUTOR.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>PARÁGRAFO ÚNICO</strong> - A EDITORA usando de seus melhores esforços e viabilidade, e tanto dela 
          dependa, respeitará os direitos morais do AUTOR.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA</strong> - Outorga o AUTOR à EDITORA plenos poderes para, no país e no exterior, 
          defender os direitos da AUTORA, atuando em juízo ou fora dele, podendo substabelecer, constituir advogados 
          com os poderes da cláusula "ad judicia" e os especiais para desistir, acordar, transigir, firmar 
          compromisso, receber e dar quitação, podendo, ainda, praticar todos os atos necessários ao cumprimento do 
          mandato conferido por esta cláusula.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA PRIMEIRA</strong> - O AUTOR e a EDITORA obrigam-se, reciprocamente, a, antes de 
          iniciar qualquer pleito contra terceiros, comunicar o fato ao outro contratante, visando a evitar eventual 
          duplicidade de atuação ou descoordenação quanto às medidas protetoras adotadas. Da mesma forma, cada parte 
          comunicará à outra a existência de litígio que possa afetar a execução deste contrato.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA SEGUNDA</strong> - O AUTOR fica exclusivo e pessoalmente responsável pela 
          originalidade da obra objeto deste contrato, exonerando a EDITORA de toda e qualquer responsabilidade civil 
          ou criminal, e obrigando-se a indenizá-la das perdas e danos que vier a sofrer em caso de contestação.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA TERCEIRA</strong> - Caberá à sociedade de gestão coletiva de direitos autorais a que 
          esteja filiada a EDITORA a arrecadação somente dos direitos de comunicação ao público da obra, incluindo a 
          execução em espetáculos, transmissões de rádio e televisão de qualquer natureza, alto falantes, reuniões 
          dançantes, com ou sem cobrança de ingressos, exposições, boates, bares e restaurantes onde se execute música, 
          clubes desportivos e recreativos, feiras, hotéis, clínicas, hospitais, órgãos públicos da administração 
          direta ou indireta, fundacionais ou estatais, meios de transporte, projeções cinematográficas ou 
          audio-visuais e qualquer outro meio, forma ou procedimento de comunicação ao público da obra entendidos com 
          tal, sob prévia aprovação da EDITORA e que dependa da gestão coletiva para o mais eficaz exercício desse 
          direito, tanto no Brasil como no exterior. O AUTOR perceberá diretamente da sociedade de gestão coletiva a 
          sua parcela da distribuição efetuada pela mesma, deduzido o custo da arrecadação e obedecidas, quanto ao 
          líquido, as porcentagens estipuladas na letra g dos incisos 1 e 2 da Cláusula Sexta, desobrigada a EDITORA 
          de responder perante o AUTOR pela exatidão das contas prestadas pela sociedade.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>PARÁGRAFO ÚNICO</strong> - É facultado à EDITORA autorizar a delegação da arrecadação das quantias 
          geradas pelas formas de exploração prevista na letra e dos incisos 1 e 2 da Cláusula Sexta, a sociedade de 
          gestão coletiva de direitos, nas mesmas condições previstas no "caput" desta cláusula, ou a outras entidades 
          existentes ou aquelas que venham a ser formadas com tal finalidade, ou ainda, proceder a EDITORA a 
          arrecadação direta dos direitos aludidos nos incisos mencionados.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA QUARTA</strong> - Caberá exclusivamente à EDITORA eleger a sociedade de gestão 
          coletiva de direitos a que alude a Cláusula anterior, facultando a EDITORA transferir essa administração para 
          outra sociedade, por qualquer razão e a seu exclusivo critério.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA QUINTA</strong> - Caberá unicamente e exclusivamente a EDITORA a arrecadação de 
          quaisquer outros direitos de exploração da obra em apreço, bem como a distribuição destes direitos o AUTOR, 
          conforme os termos e condições estabelecidos neste Contrato.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA SEXTA</strong> - Os direitos objeto desta cessão abrangem todos e cada um dos 
          aspectos patrimoniais da obra musical ou lítero-musical, valendo esta cessão por todo o prazo de proteção 
          legal consignado no artigo 41 da Lei n.º 9.610/98.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA SÉTIMA</strong> - Os direitos que derivam do presente contrato poderão ser 
          transferidos pela EDITORA a qualquer de suas companhia associadas, coligadas ou filiadas, existentes ou que 
          vierem a ser constituídas, assim como a pessoas ou entidades que adquiram a totalidade ou parte de seus ativos.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA OITAVA</strong> - O AUTOR assegura à EDITORA absoluta preferência, em igualdade de 
          condições com propostas de terceiros, para a contratação de modalidades de exploração econômica da obra que, 
          eventualmente, não tenham sido previstas neste contrato, e para aquelas modalidades de exploração que venham 
          a existir no futuro.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA DÉCIMA NONA</strong> – O presente contrato refere-se a 100% (cem por cento) da(s) obra(s) 
          <strong>"{obra?.titulo || 'XXXXXX'}"</strong> posto que a(s) obra(s) é / são de autoria somente de{' '}
          <strong>{dados.nomeCompleto || 'XXXXXXXXXXXXXX'}</strong> ({dados.pseudonimoArtistico || 'XXXXXXXX'}).
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          <strong>CLÁUSULA VIGÉSIMA</strong> - Fica subordinada a presente cessão onerosa ao que dispõe o Capítulo V 
          do Título III da Lei n.º 9.610/98, eleito o foro Central da cidade de São Paulo para dirimir as questões que 
          derivem deste contrato.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          E por estarem assim justos e contratados, obrigam-se a fazê-lo bom, firme e valioso, por si, seus herdeiros e 
          sucessores.
        </p>

        <p style={{ textAlign: 'justify', marginBottom: '16px' }}>
          Assinam as partes este contrato em 2 (duas) vias de igual teor e forma.
        </p>

        <p style={{ textAlign: 'center', marginBottom: '40px' }}>
          São Paulo, {dados.dataAssinatura || 'XXX de XXXXX de XXX'}.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px' }}>
          <div style={{ textAlign: 'center', width: '45%' }}>
            <div style={{ borderBottom: '1px solid #000', marginBottom: '8px', height: '30px' }}></div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{dados.nomeCompleto || 'XXXXXXXXXXXXXX'}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '10pt' }}>AUTOR</p>
          </div>
          <div style={{ textAlign: 'center', width: '45%' }}>
            <div style={{ borderBottom: '1px solid #000', marginBottom: '8px', height: '30px' }}></div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>TÔ NA MIDIA DIGITAL LTDA</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '10pt' }}>EDITORA</p>
          </div>
        </div>
      </div>
        </div>
  )
}

ContratoEdicaoTemplate.propTypes = {
  dados: PropTypes.shape({
    nomeCompleto: PropTypes.string,
    nacionalidade: PropTypes.string,
    estadoCivil: PropTypes.string,
    profissao: PropTypes.string,
    rg: PropTypes.string,
    orgaoEmissor: PropTypes.string,
    cpf: PropTypes.string,
    endereco: PropTypes.string,
    bairro: PropTypes.string,
    municipio: PropTypes.string,
    uf: PropTypes.string,
    cep: PropTypes.string,
    dataAssinatura: PropTypes.string,
  }).isRequired,
  obra: PropTypes.shape({
    titulo: PropTypes.string,
    isrc: PropTypes.string,
    duracao: PropTypes.string,
  }),
}

export default ContratoEdicaoTemplate

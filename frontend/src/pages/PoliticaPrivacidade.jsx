import { Link } from 'react-router-dom'
import logoTNM from '../assets/Logo to na Midia ATUALIZADO.png'
import './Auth.css'

function PoliticaPrivacidade() {
  return (
    <div className="auth-policy">
      <div className="auth-policy-content">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <img src={logoTNM} alt="Logo Tô na Mídia" style={{ height: 96, width: 96, objectFit: 'contain' }} />
        </div>

        <h1>POLÍTICA DE PRIVACIDADE — TÔ NA MÍDIA</h1>

        <h2>1. Informações Gerais</h2>
        <p>
          A presente Política de Privacidade contém informações sobre a coleta, uso, armazenamento, tratamento e
          proteção dos dados pessoais dos usuários e visitantes do aplicativo TÔ NA MÍDIA, com a finalidade de
          demonstrar absoluta transparência quanto ao assunto e esclarecer a todos os interessados sobre os tipos de
          dados que são coletados, os motivos da coleta e a forma como os usuários podem gerenciar ou excluir as suas
          informações pessoais.
        </p>
        <p>
          Esta Política de Privacidade aplica-se a todos os usuários e visitantes do aplicativo Tô na Mídia e integra
          os Termos e Condições Gerais de Uso do aplicativo, de titularidade de Tô Na Mídia Digital, devidamente
          inscrita no CNPJ sob o nº 02.364.590 0001-67, situada em Rua Geremia Lunardelli, 503, 05537-100, Jd Peri
          Peri, São Paulo, SP, doravante nominada simplesmente &quot;Controladora&quot;.
        </p>
        <p>
          O presente documento foi elaborado em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº
          13.709/18) e o Marco Civil da Internet (Lei nº 12.965/14). Ainda, o documento poderá ser atualizado em
          decorrência de eventual atualização normativa, razão pela qual se convida o usuário a consultar
          periodicamente esta seção.
        </p>

        <h2>2. Como Recolhemos os Dados Pessoais do Usuário</h2>
        <p>Os dados pessoais do usuário são recolhidos pela plataforma da seguinte forma:</p>
        <ul>
          <li>
            <strong>Quando o usuário cria uma conta na plataforma:</strong> são coletados os dados de identificação
            básicos do usuário — Nome Completo, Nacionalidade, RG, Órgão Emissor, CPF, Endereço, CEP, Bairro,
            Município, UF, Pseudônimo Artístico, Estado Civil, Profissão, E-mail, Celular e Data de Nascimento.
          </li>
          <li>
            <strong>Quando o usuário acessa e utiliza as funcionalidades da plataforma:</strong> dados de login,
            sessões de autenticação em dois fatores (2FA), endereço IP, tipo de dispositivo, navegador e registros de
            acesso (logs).
          </li>
          <li>
            <strong>Quando o usuário cadastra obras musicais, shows ou realiza upload de contratos:</strong> dados e
            arquivos fornecidos pelo próprio artista no momento do cadastro dessas informações.
          </li>
          <li>
            <strong>Por intermédio de parceiros:</strong> a plataforma recebe da ONErpm informações referentes à
            apuração de valores e reproduções das obras do artista, exibidas no Dashboard Financeiro.
          </li>
        </ul>

        <h2>3. Quais Dados Pessoais Recolhemos</h2>
        <p>
          <strong>3.1. Dados para criação da conta:</strong> Nome Completo, Nacionalidade, RG e Órgão Emissor, CPF,
          Endereço/CEP/Bairro/Município/UF, Pseudônimo Artístico, Estado Civil, Profissão, E-mail, Celular e Data de
          Nascimento — utilizados para identificação, formalização de contratos, pagamentos, comunicação e
          autenticação em dois fatores.
        </p>
        <p>
          <strong>3.2. Dados para otimização e segurança da navegação:</strong> registros de login, tentativas de
          autenticação em dois fatores, endereço de IP, tipo de dispositivo e navegador utilizado.
        </p>
        <p>
          <strong>3.3. Dados das obras musicais:</strong> Capa do Álbum, Título da Obra, Letra da Música,
          Compositores, Código ISRC e Arquivo de Áudio (.wav/.mp3).
        </p>
        <p>
          <strong>3.4. Dados de shows e eventos:</strong> Capa/Banner, Data e Horário, Endereço do evento, URL de
          venda de ingressos e WhatsApp de contato, exibidos publicamente na Vitrine de Shows.
        </p>
        <p>
          <strong>3.5. Dados financeiros:</strong> saldo disponível (50% do valor total apurado), data/hora da última
          atualização e reproduções mensais, exibidos no Dashboard Financeiro.
        </p>
        <p>
          <strong>3.6. Dados de contratos:</strong> contrato selecionado ou documento enviado, aceite das declarações
          de ineditismo e desta Política, e dados da assinatura digital (data, hora e identificação do signatário).
        </p>
        <p>
          <strong>3.7. Notificações:</strong> no cadastro, o usuário manifesta consentimento quanto ao recebimento de
          notificações da plataforma (e-mail, SMS e/ou push).
        </p>
        <p>
          <strong>3.8. Dados sensíveis:</strong> a plataforma não coleta, como regra, dados pessoais sensíveis (origem
          racial ou étnica, convicção religiosa, opinião política, saúde ou orientação sexual).
        </p>

        <h2>4. Para que Finalidades Utilizamos os Dados Pessoais</h2>
        <ul>
          <li>Cadastro, login e identificação do artista na plataforma;</li>
          <li>Segurança da conta por meio de autenticação em dois fatores (2FA) e prevenção a fraudes;</li>
          <li>Gestão do catálogo (obras musicais e shows);</li>
          <li>Apuração e pagamento de direitos autorais, e solicitação de saque junto à ONErpm;</li>
          <li>Divulgação pública de shows na Vitrine de Shows;</li>
          <li>Formalização contratual (upload, seleção e assinatura digital de contratos);</li>
          <li>Comunicação de notificações e avisos;</li>
          <li>Cumprimento de obrigações legais, fiscais e contratuais.</li>
        </ul>

        <h2>5. Por Quanto Tempo os Dados Pessoais Ficam Armazenados</h2>
        <p>
          Os dados são armazenados durante o período necessário à prestação dos serviços ou ao cumprimento das
          finalidades previstas neste documento (art. 15, I, Lei nº 13.709/18), podendo ser removidos ou anonimizados
          a pedido do usuário, exceto nas hipóteses de conservação previstas no art. 16 da mesma lei (cumprimento de
          obrigação legal, estudos por órgãos de pesquisa, transferência a terceiros nos termos da lei, ou uso
          exclusivo da Controladora com dados anonimizados). Contratos assinados digitalmente e documentos fiscais
          seguem os prazos de guarda da legislação civil, tributária e trabalhista aplicável.
        </p>

        <h2>6. Segurança dos Dados Pessoais Armazenados</h2>
        <p>
          A Controladora aplica medidas técnicas e organizativas para proteger os dados contra acessos não
          autorizados, destruição, perda, alteração ou difusão indevida, incluindo criptografia, controle de acesso e
          autenticação em dois fatores. Dados financeiros processados junto à ONErpm trafegam com criptografia SSL ou
          equivalente. Em caso de incidente de segurança relevante, a Controladora se compromete a comunicar o
          usuário e a Autoridade Nacional de Proteção de Dados (ANPD), quando aplicável.
        </p>

        <h2>7. Compartilhamento dos Dados</h2>
        <p>
          Informações cadastradas na Vitrine de Shows (banner, título, data, horário e local) são exibidas
          publicamente para divulgação do evento. O WhatsApp de contato e a URL de venda de ingressos também são
          públicos, exclusivamente para viabilizar a compra pelos usuários e visitantes. O pseudônimo artístico e a
          capa das obras em Meus Lançamentos são exibidos publicamente para identificação do artista e do catálogo.
        </p>

        <h2>8. Transferência dos Dados a Terceiros</h2>
        <p>
          Os dados podem ser compartilhados com: <strong>ONErpm</strong> (ao solicitar saque, o usuário é
          redirecionado, mediante aviso prévio, para o processamento financeiro); <strong>prestadores terceirizados</strong>{' '}
          (hospedagem, nuvem, e-mail/SMS e assinatura digital, mediante obrigações contratuais de confidencialidade); e{' '}
          <strong>autoridades públicas</strong>, quando exigido por lei ou ordem judicial. Ao ser redirecionado a um
          site de terceiros, o usuário deixa de estar sob esta Política, e a Controladora não se responsabiliza pelas
          práticas de privacidade de tais terceiros.
        </p>

        <h2>9. Cookies ou Dados de Navegação</h2>
        <p>
          Cookies são utilizados para personalizar a experiência de uso, armazenando dados de acesso como local e
          horário. O usuário pode configurar seu dispositivo para recusar cookies, ciente de que isso pode afetar o
          funcionamento de alguns recursos da plataforma.
        </p>

        <h2>10. Consentimento</h2>
        <p>
          Ao utilizar os serviços e fornecer informações pessoais, inclusive ao marcar o aceite desta Política no
          Cadastro, o usuário consente com o tratamento de seus dados nos termos aqui descritos, podendo retirar o
          consentimento a qualquer momento pelo e-mail{' '}
          <a href="mailto:tonamidia@tonamidia.com.br">tonamidia@tonamidia.com.br</a>.
        </p>

        <h2>11. Alterações desta Política de Privacidade</h2>
        <p>
          A Controladora poderá modificar esta Política a qualquer momento; alterações relevantes serão notificadas
          aos usuários. Em caso de fusão, aquisição ou venda da plataforma, os dados poderão ser transferidos aos
          novos proprietários para garantir a continuidade dos serviços.
        </p>

        <h2>12. Jurisdição para Resolução de Conflitos</h2>
        <p>
          Aplica-se o Direito brasileiro, com foro eleito na comarca de São Paulo/SP, renunciando-se a qualquer outro,
          por mais privilegiado que seja.
        </p>

        <div style={{ textAlign: 'center' }}>
          <Link to="/cadastro" className="auth-back-link">
            ← Voltar ao Cadastro
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PoliticaPrivacidade

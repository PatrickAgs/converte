# Converte

Converta, comprima e limpe metadados de imagens, PDF e Word direto no celular ou no computador, pelo navegador.

**Abrir:** https://patrickags.github.io/converte/

Os arquivos são processados no próprio aparelho. Nada é enviado para servidor nenhum.

## O que faz

| Arquivo | Converter | Ferramentas |
|---|---|---|
| Imagem (PNG, JPG, WEBP, HEIC, GIF) | Otimizar para IA, PNG, JPG, WEBP, PDF, Word (várias fotos → um arquivo só) | Limpar metadados, comprimir, reduzir, girar, preto e branco, recortar quadrado |
| PDF | Markdown (IA), Word, PNG, JPG, texto | Limpar metadados, juntar, separar páginas, girar |
| Word (.docx) | Markdown (IA), texto | Limpar metadados (inclusive das fotos de dentro) |
| Texto (.txt, .md, .csv) | PDF, Word | — |

### Para mandar à IA gastando menos

- **Para Markdown (IA)**: PDF e Word viram `.md` com títulos, listas, negrito e tabelas, sem cabeçalho e rodapé repetidos, número de página e hífen de quebra de linha. A IA lê o mesmo conteúdo gastando bem menos tokens do que com o PDF.
- **Otimizar para IA**: a foto fica no tamanho máximo que a IA aproveita (1568 px no lado maior), em JPG leve e sem metadados.
- No fim aparece quantos tokens, mais ou menos, o arquivo vai gastar.

### Limpar metadados

Tira o que fica escondido dentro do arquivo: localização (GPS), modelo do celular, data, autor, programa usado, prompts de IA e marcações de "gerada por IA" (C2PA / Content Credentials, IPTC DigitalSourceType). Em JPG, PNG e WEBP a limpeza é feita sem salvar a imagem de novo, então a qualidade fica idêntica.

Marcas d'água invisíveis gravadas nos próprios pixels (como o SynthID do Google) não são metadados e não são removidas.

## Instalar como app

No Chrome do Android: menu ⋮ → **Adicionar à tela inicial**. No iPhone (Safari): botão de compartilhar → **Adicionar à Tela de Início**. Depois da primeira visita ele abre mesmo sem internet.

## Como foi feito

Uma página só (`index.html`), sem servidor. Bibliotecas: [pdf-lib](https://pdf-lib.js.org/), [PDF.js](https://mozilla.github.io/pdf.js/), [JSZip](https://stuk.github.io/jszip/) e, só para fotos HEIC, [heic2any](https://github.com/alexcorvi/heic2any).

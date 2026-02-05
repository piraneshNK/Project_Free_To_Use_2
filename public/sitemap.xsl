<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            max-width: 75rem;
            margin: 0 auto;
            padding: 2rem;
          }
          h1 {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1rem;
            color: #666;
            margin-bottom: 2rem;
          }
          a {
            color: #0070f3;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #eaeaea;
            border-radius: 5px;
            overflow: hidden;
          }
          th {
            text-align: left;
            padding: 1rem;
            background: #fafafa;
            border-bottom: 1px solid #eaeaea;
            font-weight: 600;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          td {
            padding: 1rem;
            border-bottom: 1px solid #eaeaea;
            font-size: 0.9rem;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background: #fafafa;
          }
          .count {
            background: #0070f3;
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-left: 0.5rem;
          }
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <p>
          This is a generated XML Sitemap for content discovery.
          <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs</span>
        </p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last Modified</th>
              <th>Change Frequency</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                </td>
                <td><xsl:value-of select="sitemap:lastmod"/></td>
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:priority"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

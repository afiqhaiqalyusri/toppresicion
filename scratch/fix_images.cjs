const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Replace hardcoded "/img/" with "img/"
    content = content.replace(/"\/img\//g, '"img/');
    content = content.replace(/'\/img\//g, "'img/");
    
    // 2. Fix dynamic template literals: `/${...}` -> `${...}`
    content = content.replace(/src=\{`\/\$\{/g, 'src={`\\${'); // This regex might be tricky, let's use exact string replace for known cases
    
    // Specific known cases:
    content = content.replace(/src=\{\`\/\$\{homeWhoWeAre\?\.image \|\| ''\}\`\}/g, 'src={`\\${homeWhoWeAre?.image || \'\'}`.replace(/^\\/+/, \'\')}');
    content = content.replace(/src=\{\`\/\$\{whyChooseUs\?\.image \|\| ''\}\`\}/g, 'src={`\\${whyChooseUs?.image || \'\'}`.replace(/^\\/+/, \'\')}');
    content = content.replace(/src=\{\`\/\$\{service\.heroImage \|\| service\.image \|\| ''\}\`\}/g, 'src={`\\${service.heroImage || service.image || \'\'}`.replace(/^\\/+/, \'\')}');
    content = content.replace(/src=\{\`\/\$\{cert\.image\.replace\(\/\\^\\\\\+\/\, ''\)\}\`\}/g, 'src={`\\${cert.image.replace(/^\\/+/, \'\')}`}');
    content = content.replace(/src=\{\`\/\$\{service\.supportingImage \|\| service\.heroImage \|\| 'img\/hero-cnc\.jpg'\}\`\}/g, 'src={`\\${service.supportingImage || service.heroImage || \'img/hero-cnc.jpg\'}`.replace(/^\\/+/, \'\')}');
    content = content.replace(/src=\{\`\/\$\{rel\.heroImage \|\| rel\.image \|\| 'img\/hero-cnc\.jpg'\}\`\}/g, 'src={`\\${rel.heroImage || rel.image || \'img/hero-cnc.jpg\'}`.replace(/^\\/+/, \'\')}');
    
    // 3. Fix Card.jsx
    content = content.replace(/image\.startsWith\('\/'\) \? image : '\/' \+ image/g, "image.startsWith('/') ? image.substring(1) : image");

    // 4. Fix Hero.jsx
    content = content.replace(/heroImage = data\.image\.startsWith\('\/'\) \? data\.image : '\/' \+ data\.image;/g, "heroImage = data.image.startsWith('/') ? data.image.substring(1) : data.image;");
    
    // 5. Fix PageHero.jsx
    content = content.replace(/heroImage = '\/img\//g, "heroImage = 'img/");
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log("Images fixed!");

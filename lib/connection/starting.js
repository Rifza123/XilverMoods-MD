import { exec } from 'child_process';
import { chalk, color, bgcolor, ConsoleLog, biocolor } from '../color';
import { terminal as term } from 'terminal-kit';

const loading = async () => {
    let progressBar, progress = 0;

    function doProgress() {
        progress += Math.random() / 10;
        progressBar.update(progress);
        if (progress >= 1) {
            setTimeout(() => {
                console.clear();
                exec(`screenfetch -A Deepin`, (error, stdout, stderr) => {
                    console.log(stdout);
                    console.log(bgcolor('New base whatsapp bot by @Rifza', 'gray'));
                });
            }, 200);
        } else {
            setTimeout(doProgress, 90 + Math.random() * 200);
        }
    }

    progressBar = term.progressBar({ width: 80, title: '\n\nLoad this script....', eta: true, percent: true });

    doProgress();
};

export { loading };

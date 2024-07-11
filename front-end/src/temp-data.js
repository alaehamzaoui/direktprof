import schefferBild from './assets/img/profsPic/prof4.jpg';
import LutickeBild from './assets/img/profsPic/prof2.jpg';
import oesingBild from './assets/img/profsPic/prof3.jpg';
import kohnBild from './assets/img/profsPic/prof1.jpg';

export const profs = [{
    id: '1',
    name: 'scheffer',
    imageName: schefferBild,
    sprechstunde: {
        tag: 'Montag',
        beginn: '10:00',
        ende: '11:00'
    }
}, {
    id: '2',
    name: 'lutticke',
    imageName: LutickeBild,
    sprechstunde: {
        tag: 'Dienstag',
        beginn: '14:00',
        ende: '15:00'
    }
}, {
    id: '3',
    name: 'Oesing',
    imageName: oesingBild,
    sprechstunde: {
        tag: 'Mittwoch',
        beginn: '09:00',
        ende: '10:00'
    }
}, {
    id: '4',
    name: 'Kohn',
    imageName: kohnBild,
    sprechstunde: {
        tag: 'Donnerstag',
        beginn: '13:00',
        ende: '14:00'
    }
}];

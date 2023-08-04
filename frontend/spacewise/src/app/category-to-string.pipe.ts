import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'categoryToString'
})
export class CategoryToStringPipe implements PipeTransform {
    transform(value: number): string {
        switch(value) {
            case 0:
                return 'Himmelskörper';
            case 1:
                return 'Physik';
            case 2:
                return 'Technik';
            case 3:
                return 'Anderes';
            default:
                return 'Anderes';
        }
    }
}
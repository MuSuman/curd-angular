import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any, args1?: any, args2?: any): any {
   
    if(args === '') {
      return value;
    } else {

      if(args1 === 'Product' && args2 === 3) {
        let filteredData= value.filter((o: any) => { return o.itemName.toLowerCase().includes(args.toLowerCase())});
        return filteredData;
      } else if(args1 === 'Sub category' && args2 === 2) {
        let filteredData= value.filter((o: any) => { return o.categoryName.toLowerCase().includes(args.toLowerCase())});
        return filteredData;
      } else if(args1 === 'Category' && args2 === 1){
        let filteredData= value.filter((o: any) => { return o.category.toLowerCase().includes(args.toLowerCase())});
        return filteredData;
      } else {
        return value;
      }
    
    }
    
  }

}

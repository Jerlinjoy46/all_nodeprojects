#include <stdio.h>
int get_array();
int add_array();
int display_array();
int main()
{
    int array[100][100],array2[100][100],i,j,total[100][100],limit;
     get_array();
     add_array();
     display_array();
   return 0;
}
 
 int get_array(){
     int get;
     int array[100][100],array2[100][100],i,j,total[100][100],limit;
    printf("enter the limit of array:");
    scanf("%d",&limit);
    printf("enter the array1:\n");
    for(i=0;i<limit;i++){
        for(j=0;j<limit;j++){
            scanf("%d",&array[i][j]);
        }
           printf("\n");
    }
    printf("enter the array2:\n");
    for(i=0;i<limit;i++){
        for(j=0;j<limit;j++){
            scanf("%d",&array2[i][j]);
        }
           printf("\n");
    }  
    return get;
 } 
 int add_array(){
     int add;
     int array[100][100],array2[100][100],i,j,total[100][100],limit;
    for(i=0;i<limit;i++){
        for(j=0;j<limit;j++){
            total[i][j]=array[i][j]+array2[i][j];
        }
    } 
    return add;
 } 
 int display_array(){ 
     int array[100][100],array2[100][100],i,j,total[100][100],limit;
     int display;
      printf("total:\n");
    for(i=0;i<limit;i++){
        for(j=0;j<limit;j++){
            printf("%d \t",total[i][j]);
        }
        printf("\n");
    }
    return display;
 
 }
    


#! /bin/ksh
echo 'start'
n=1
while [[ $n -le 12000000 ]]; do
echo "12345678" >> ./BSC_DATAFILE.dat 
((n+=1))
done


echo 'end';
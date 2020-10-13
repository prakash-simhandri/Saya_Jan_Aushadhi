#Libraries
#glycomet, sartelh40
needs(dplyr) #Distinct Rows
needs(pbapply) #Applying with a loading value
needs(stringr) #String Extract Library
needs(rstudioapi) #Get working d

if (TRUE){
  setwd('./Rscript')
  JAK_Drug_Database <- read.csv("JAK_Database_12_05.csv", stringsAsFactors = F)
  General_Drug_Database <- read.csv("Medicine_Database_V.csv", stringsAsFactors = F)
  General_Drug_Database$X = row.names(General_Drug_Database)
  
  #random_drug <- General_Drug_Database[grepl(as.character("calpol-250"), General_Drug_Database$NameId, useBytes = T),]
  random_drug <- General_Drug_Database[grepl(as.character(input[[1]]), General_Drug_Database$NameId, useBytes = T),]
  random_drug$injection = F
  ##To Start with we will take a take a random drug and convert it.
  ##We sample a random drug
  ####random_drug <- General_Drug_Database[sample(1:nrow(General_Drug_Database), 1), ]
  
  #Making Master_Solutions_Dataframe
  solutionsm_df <- as.data.frame(matrix(NA, nrow = 0, ncol = 3))
  colnames(solutionsm_df) <- c("Reference_Id", "Drug_Code", "Quantity")
}

##
##One, We need to go through each of the requested drugs.
##Two, Currently this is a for-loop, but it should be converted to an apply.
for (x in 1:nrow(random_drug)){
if (nrow(random_drug) > 0) {
    x <- 1
    #First, get the composition count so we know how many elements compose it.
    Comp_Count <- random_drug$compcount[x]
    #Second, pull a temporary dataset from JAK of all drugs that contain any element
    #Pull all elements for all drugs
    temp_JAK_data_holder <- as.data.frame(matrix(NA, nrow = nrow(JAK_Drug_Database)), ncol = 0)
    for (y in 1:Comp_Count) {
      #Any returns in for all vectors and gives a list that is true
      temp_JAK_data <- apply(JAK_Drug_Database[,112:143], 1, function(r) {
        any(r %in% as.numeric(random_drug[x, 153+y]))
      })
      temp_JAK_data_holder[,(ncol(temp_JAK_data_holder)+1)] = temp_JAK_data
    }
    #Reduce allows me to go from right to left in the row with an Or.
    #This means that I now have all elements that compose the drug
    #Reduce fails if it isn't comparing - so put an if to ensure their are comparisons.
    if (ncol(temp_JAK_data_holder) > 2) {
      temp_JAK_data_holder[,1] = Reduce("|", temp_JAK_data_holder[,2:ncol(temp_JAK_data_holder)])
    } else {
      temp_JAK_data_holder[,1] = temp_JAK_data_holder[,2]
    }

    #Now I put the relevant information into temp_JAK_data
    temp_JAK_data <- JAK_Drug_Database[temp_JAK_data_holder[,1],]
    intial_results <- temp_JAK_data

    #Only keep the elements that match the Method (This should be adjusted to be more nuanced later)
    temp_JAK_data <- temp_JAK_data[temp_JAK_data$Method == random_drug$Method[x],]

    #Check if there are any Elements and if not move on
    if (nrow(temp_JAK_data) == 0) {
      solutionsm_df[nrow(solutionsm_df)+1,] = NA
      solutionsm_df$Reference_Id[nrow(solutionsm_df)]= random_drug$NameId[x]
      solutionsm_df$Quantity[nrow(solutionsm_df)] = 0
      next()
    }

    #Variable to Eliminate
    temp_JAK_data$keep <- TRUE

    #Now I loop through the other way in temp_JAK_data to eliminate all drugs that contain extra salts
    for (y in 1:nrow(temp_JAK_data)) {
      temp_compcount <- temp_JAK_data$comp_count[y]
      for (z in 1:temp_compcount) {
        if (!temp_JAK_data[y, 111+z] %in% random_drug[x, 154:200]) {
          temp_JAK_data$keep[y] = FALSE
          break()
        }
      }
    }

    #Keeping the ones specified earlier
    temp_JAK_data <- temp_JAK_data[temp_JAK_data$keep,]

    #Check if there are any Elements and if not move on
    if (nrow(temp_JAK_data) == 0) {
      solutionsm_df[nrow(solutionsm_df)+1,] = NA
      solutionsm_df$Reference_Id[nrow(solutionsm_df)]= random_drug$NameId[x]
      solutionsm_df$Quantity[nrow(solutionsm_df)] = 0
      next()
    }

    #Removing those that exceed Salt Quantities #####Noted Inflection Point

    if (random_drug$Method[x] == "Injection") { #Injection's all ml are converted to maximum amount
      if (random_drug$string_packet[x] == "ml") {
        if (is.na(random_drug$perquant[x])) {

        } else {
          total_holder = as.numeric(random_drug$digit_packet[x])/as.double(gsub(random_drug$stringperquant[x], "",random_drug$perquant[x]))
          for (y in 1:random_drug$compcount[x]) {
            random_drug[x, 53+y] = as.double(random_drug[x, 53+y])*total_holder #Reverts at a later point
          }
          random_drug$injection[x] = T
        }
      } else {

      }
      for (y in 1:nrow(temp_JAK_data)) {
        if (temp_JAK_data$packet_string[y] == "ml") {
          if (is.na(temp_JAK_data$perquant[y])) {

          } else {
            total_holder = as.numeric(temp_JAK_data$packet_digit[y]/temp_JAK_data$perquant_digit[y])
            for (z in 1:temp_JAK_data$comp_count[y]){
              temp_JAK_data[y, 41+z] = as.double(temp_JAK_data[y, 41 + z] * total_holder)
            }
          }
        }
         temp_compcount <- temp_JAK_data$comp_count[y]
         for (z in 1:temp_compcount) {
           ref_comp_quant <- temp_JAK_data[y, 41 + (match(temp_JAK_data[y, (z+111)], temp_JAK_data[y,112:143]))]
           ori_comp_quant <- as.numeric(random_drug[x, 53+ (match(temp_JAK_data[y, (z+111)], random_drug[x, 154:200]))])
           if (ref_comp_quant > ori_comp_quant) {
             temp_JAK_data$keep[y] = FALSE
           }
         }
      }
    } else if (random_drug$Method[x] == "Suspension/Syrup") {
      #For Suspensions/Syrups we make sure the ratios align
      #There are two instances of suspensions one is where we have the weight of the salt, and the other is a percentage
      #In the instance of a weight of a salt we derive the ratio and ensure that they are equal
      #The other possibility is to adjust dosages/packet size to the ratio difference
      #However this requires substantial bit of UI editing
      #This can and should be adjusted in the next update

      if (random_drug$string_packet[x] == "ml" & random_drug$Unit1[x] == "mg") {
        temp_JAK_data = temp_JAK_data[temp_JAK_data$Unit1 == "mg", ]
        if (!is.na(random_drug$perquant[x])) {
          total_holder = as.double(gsub(random_drug$stringperquant[x], "",random_drug$perquant[x]))
          for (y in 1:random_drug$compcount[x]) {
            random_drug[x, 53+y] = as.double(random_drug[x, 53+y])/total_holder
          }
          for (y in 1:nrow(temp_JAK_data)) {
            JAK_total_holder = as.double(temp_JAK_data$perquant_digit[y])
            for (z in 1:temp_JAK_data$comp_count[y]) {
              temp_JAK_data[y, 41+z] = as.double(temp_JAK_data[y, 41+z])/JAK_total_holder
            }
          }
        } else if (random_drug$string_packet == "ml" & random_drug$Unit1 == "%"){
          temp_JAK_data = temp_JAK_data[temp_JAK_data$Unit1 == "%",]
        }
      }
      #Makes sure nothing exceeds ratio / will be unneccesary later. This removes half dosage jak drugs.
      for (y in 1:nrow(temp_JAK_data)) {
        temp_compcount <- temp_JAK_data$comp_count[y]
        for (z in 1:temp_compcount) {
          ref_comp_quant <- temp_JAK_data[y, 41 + (match(temp_JAK_data[y, (z+111)], temp_JAK_data[y,112:143]))]
          ori_comp_quant <- as.numeric(random_drug[x, 53+ (match(temp_JAK_data[y, (z+111)], random_drug[x, 154:200]))])
          if (ref_comp_quant > ori_comp_quant) {
            temp_JAK_data$keep[y] = FALSE
          }
        }
      }
    } else if (random_drug$Method[x] == "drops") { #This works for drops
      if (random_drug$Unit1[x] == "%") {
        temp_JAK_data = temp_JAK_data[temp_JAK_data$Unit1 == "%",]
      } else if (random_drug$Unit1[x] == "mg") {
        temp_JAK_data = temp_JAK_data[temp_JAK_data$Unit1 == "mg", ]
        if (random_drug$string_packet[x] == "ml") {
          if (!is.na(random_drug$perquant[x])) {
            total_holder = as.double(gsub(random_drug$stringperquant[x], "",random_drug$perquant[x]))
            for (y in 1:random_drug$compcount[x]) {
              random_drug[x, 53+y] = as.double(random_drug[x, 53+y])/total_holder
              random_drug$perquant = "1 ml"
            }
            for (y in 1:nrow(temp_JAK_data)) {
              JAK_total_holder = as.double(temp_JAK_data$perquant_digit[y])
              for (z in 1:temp_JAK_data$comp_count[y]) {
                temp_JAK_data[y, 41+z] = as.double(temp_JAK_data[y, 41+z])/JAK_total_holder
              }
            }
          }
        }
      }
      for (y in 1:nrow(temp_JAK_data)) {
        temp_compcount <- temp_JAK_data$comp_count[y]
        for (z in 1:temp_compcount) {
          ref_comp_quant <- temp_JAK_data[y, 41 + (match(temp_JAK_data[y, (z+111)], temp_JAK_data[y,112:143]))]
          ori_comp_quant <- as.numeric(random_drug[x, 53+ (match(temp_JAK_data[y, (z+111)], random_drug[x, 154:200]))])
          if (ref_comp_quant > ori_comp_quant) {
            temp_JAK_data$keep[y] = FALSE
          }
        }
      }
    } else if (random_drug$Method[x] == "Gel/Cream/Ointment") { #These only come in percentages
      if (random_drug$Unit1[x] == "%") {
        temp_JAK_data = temp_JAK_data[temp_JAK_data$Unit1 == "%",]
      }

      for (y in 1:nrow(temp_JAK_data)) {
        temp_compcount <- temp_JAK_data$comp_count[y]
        for (z in 1:temp_compcount) {
          ref_comp_quant <- temp_JAK_data[y, 41 + (match(temp_JAK_data[y, (z+111)], temp_JAK_data[y,112:143]))]
          ori_comp_quant <- as.numeric(random_drug[x, 53+ (match(temp_JAK_data[y, (z+111)], random_drug[x, 154:200]))])
          if (ref_comp_quant > ori_comp_quant) {
            temp_JAK_data$keep[y] = FALSE
          }
        }
      }
    } else {
      for (y in 1:nrow(temp_JAK_data)) {
        temp_compcount <- temp_JAK_data$comp_count[y]
        for (z in 1:temp_compcount) {
          ref_comp_quant <- temp_JAK_data[y, 41 + (match(temp_JAK_data[y, (z+111)], temp_JAK_data[y,112:143]))]
          ori_comp_quant <- as.numeric(random_drug[x, 53+ (match(temp_JAK_data[y, (z+111)], random_drug[x, 154:200]))])
          if (ref_comp_quant > ori_comp_quant) {
            temp_JAK_data$keep[y] = FALSE
          }
        }
      }
    }

    #Keeping the ones specified earlier
    temp_JAK_data <- temp_JAK_data[temp_JAK_data$keep,]

    #Check if there are any Elements and if not move on
    if (nrow(temp_JAK_data) == 0) {
      solutionsm_df[nrow(solutionsm_df)+1,] = NA
      solutionsm_df$Reference_Id[nrow(solutionsm_df)]= random_drug$NameId[x]
      solutionsm_df$Quantity[nrow(solutionsm_df)] = 0
      next()
    }

    #Creating reference_drug
    ref_drug <- as.data.frame(matrix(NA, nrow = 0, ncol = 4))
    colnames(ref_drug) <- c("Drug_Code", "Salt_Code", "Quantity", "Number")

    for (a in 1:Comp_Count) {
      ref_drug[nrow(ref_drug)+1,] = NA
      ref_drug$Drug_Code[nrow(ref_drug)] = random_drug$NameId[x]
      ref_drug$Salt_Code[nrow(ref_drug)] = random_drug[x, a+153]
      ref_drug$Quantity[nrow(ref_drug)] = random_drug[x, a + 53]
      ref_drug$Number[nrow(ref_drug)] = 1
    }

    #Creating reference drug matrix

    ref_drug_matrix = matrix(NA, nrow = (length(unique(ref_drug$Salt_Code))), ncol = 1)
    rownames(ref_drug_matrix) = unique(ref_drug$Salt_Code)
    colnames(ref_drug_matrix) = unique(ref_drug$Drug_Code)

    for (z in 1:nrow(ref_drug)) {
      rlength = match(ref_drug$Salt_Code[z], rownames(ref_drug_matrix))
      ref_drug_matrix[rlength, 1] = ref_drug$Quantity[z]
    }

    #Make a solutions dataframe for all possible solutions for this particular drug

    #Take a vector of all Drug Codes
    drug_code_vector <- temp_JAK_data$Drug.Code

    #Make Linear Combination of All Drugs

    group_size = nrow(temp_JAK_data)
    if (length(drug_code_vector) > 1) {
      combo_list <- combn(drug_code_vector, group_size)
    } else { #Change
      combo_list <- as.matrix(drug_code_vector, nrow = 1, ncol = 1)
    }

    #First implement this, then implement the Unit System.
    #Upon implementation of the Unit System, and successful trial runs - implement a correction capacity.
    #Upon implementation of a correction capacity, follow the remainder of the agenda.

    #Creating child_tester
    drug_combo_tester_child <-  as.data.frame(matrix(NA, nrow = 0, ncol = 4))
    colnames(drug_combo_tester_child) <- c("Drug_Code", "Salt_Code", "Quantity", "Number")

    #Running a loop through combo holder to get it DCTC
    for (z in 1:nrow(temp_JAK_data)) {
      temp_comp_count <- temp_JAK_data$comp_count[z]
      for (a in 1:temp_comp_count) {
        drug_combo_tester_child[nrow(drug_combo_tester_child)+1,] = NA
        drug_combo_tester_child$Drug_Code[nrow(drug_combo_tester_child)] = temp_JAK_data$Drug.Code[z]
        drug_combo_tester_child$Salt_Code[nrow(drug_combo_tester_child)] = temp_JAK_data[z, a+111]
        drug_combo_tester_child$Quantity[nrow(drug_combo_tester_child)] = temp_JAK_data[z, a + 41]
        drug_combo_tester_child$Number[nrow(drug_combo_tester_child)] = 1
      }
    }

    #Testing between the Two| Essentially a linear combination question.

    drug_combo_tester_matrix = matrix(NA, nrow = nrow(ref_drug_matrix), ncol = (nrow(temp_JAK_data))) ###
    rownames(drug_combo_tester_matrix) = rownames(ref_drug_matrix)
    colnames(drug_combo_tester_matrix) = unique(drug_combo_tester_child$Drug_Code)
    for (z in 1:nrow(drug_combo_tester_child)) {
      clength = match(drug_combo_tester_child$Drug_Code[z], colnames(drug_combo_tester_matrix))
      rlength = match(drug_combo_tester_child$Salt_Code[z], rownames(drug_combo_tester_matrix))
      drug_combo_tester_matrix[rlength, clength] = drug_combo_tester_child$Quantity[z]
    }

    drug_combo_tester_matrix[is.na(drug_combo_tester_matrix)] = 0

    #Repeating combinations of 0:5 (might want to expand to 5) and trying to see if any fit within the confines

    linear_combo_list <- combn(rep(0:5, ncol(drug_combo_tester_matrix)), ncol(drug_combo_tester_matrix))
    linear_combo_list <- t(linear_combo_list)
    linear_combo_list <- distinct(as.data.frame(linear_combo_list))
    linear_combo_list[, ncol(linear_combo_list) + 1] = FALSE

    #Sum Up Rows (Salt Codes on each Combination and apply a sticker to identify those that equal the target)
    results <- pbapply(linear_combo_list, 1, function (y) {
      if(ncol(linear_combo_list) == 2) {
        holder <- drug_combo_tester_matrix * y[1]
        if (all(holder == ref_drug_matrix)) {
          y[length(y)] = TRUE
        }
      } else if (ncol(linear_combo_list) > 2) {
        holder <- rowSums(drug_combo_tester_matrix %*% diag(y[1:(length(y)-1)]))
        holder <- t(t(holder))
        if (all(holder == ref_drug_matrix)) {
          y[length(y)] = TRUE
        }
      }
      return(y)
    })

    #Transform back into the original data_set
    results = as.data.frame(t(as.data.frame(results)))
    #Keep successful values
    results = results[results[,ncol(results)] == 1,]

    #Alright First Whatever Meets the Quantity I need, Then Does the Price. THe following might need to be entirely rewritten
    #I Might have to rewrite all that follows

    if (nrow(results) > 0) { #There is a result
      #following if adjusts the result in relationship to packet size
      if (random_drug$Method[x] == "Suspension/Syrup" & grepl("ml", random_drug$string_packet[x])) {
        #Okay at some point we will have to adjust quantity based on total salt amounts.
        results <- as.data.frame(results[,-ncol(results)])
        colnames(results) = unique(drug_combo_tester_child$Drug_Code)
        drug_prices = temp_JAK_data[, c(2, 111)]
        
        #While I'm here might as well add in the packet stance
        for (y in 1:ncol(results)){
          ratio = as.double(random_drug$digit_packet[x])/drug_prices[drug_prices$Drug.Code == colnames(results)[y], 2]
          ratio = ceiling(ratio)
          results[,y] = results[,y]*ratio
        }

        #Keep the one with minimum sum
        if (ncol(results) <= 2) {

        } else {
          results <- results[order(rowSums(results)),]
        }
      } else if (random_drug$Method[x] == "drops") {
        results <- as.data.frame(results[,-ncol(results)])
        colnames(results) = unique(drug_combo_tester_child$Drug_Code)
        drug_prices = temp_JAK_data[, c(2, 111)]

        #While I'm here might as well add in the packet stance
        for (y in 1:ncol(results)){
          ratio = as.double(random_drug$digit_packet[x])/drug_prices[drug_prices$Drug.Code == colnames(results)[y], 2]
          ratio = ceiling(ratio)
          results[,y] = results[,y]*ratio
        }

        #Keep the one with minimum sum
        if (ncol(results) <= 2) {

        } else {
          results <- results[order(rowSums(results)),]
        }
      } else if (random_drug$Method[x] == "Gel/Cream/Ointment") {
        results <- as.data.frame(results[,-ncol(results)])
        colnames(results) = unique(drug_combo_tester_child$Drug_Code)
        drug_prices = temp_JAK_data[, c(2, 111)]
        
        #While I'm here might as well add in the packet stance
        for (y in 1:ncol(results)){
          ratio = as.double(random_drug$digit_packet[x])/drug_prices[drug_prices$Drug.Code == colnames(results)[y], 2]
          ratio = ceiling(ratio)
          results[,y] = results[,y]*ratio
        }

        #Keep the one with minimum sum
        if (ncol(results) <= 2) {

        } else {
          results <- results[order(rowSums(results)),]
        }

      } else {
        #Order based on rowSums
        if (ncol(results) <= 2) {
          results <- as.data.frame(results[,-ncol(results)])
          minimum <- min(results[,ncol(results)])
          results <- as.data.frame(results[results[,ncol(results)]==minimum,])
        } else {
          results[, ncol(results)] = rowSums(results[,1:(ncol(results)-1)])
          minimum <- min(results[,ncol(results)])
          results <- results[results[,ncol(results)]==minimum,]
          ##Should in case of a tie, break by price (but right now I'm just taking the first one)
          results <- results[1, 1:(ncol(results)-1)]
        }
      }
    }
    colnames(results) <- colnames(drug_combo_tester_matrix)
  }
}


if (nrow(solutionsm_df) > 0) {
  print("404")
} else {
  print(results)
}